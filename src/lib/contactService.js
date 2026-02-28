import { supabase } from './supabase';

/**
 * Rate limiting helper
 * Prevents spam by tracking submission timestamps
 */
const getRateLimitKey = () => {
  const key = 'contact_form_submissions';
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setRateLimitKey = submissions => {
  localStorage.setItem('contact_form_submissions', JSON.stringify(submissions));
};

const checkRateLimit = () => {
  const submissions = getRateLimitKey();
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentSubmissions = submissions.filter(time => time > oneHourAgo);

  const limit = parseInt(import.meta.env.VITE_RATE_LIMIT_SUBMISSIONS || '5', 10);

  if (recentSubmissions.length >= limit) {
    const oldestSubmission = Math.min(...recentSubmissions);
    const waitTime = Math.ceil((oldestSubmission + 60 * 60 * 1000 - Date.now()) / 60000);
    return {
      allowed: false,
      waitTime,
      message: `Please wait ${waitTime} minute(s) before submitting another message.`,
    };
  }

  return { allowed: true };
};

export const contactService = {
  // Submit a new contact form inquiry
  async submitInquiry(data) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }
    try {
      // Check rate limiting
      const rateLimit = checkRateLimit();
      if (!rateLimit.allowed) {
        throw new Error(rateLimit.message);
      }

      const { name, email, message, budget } = data;

      // Validate input
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        throw new Error('Please fill in all required fields');
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Please enter a valid email address');
      }

      if (message.length < 10) {
        throw new Error('Message must be at least 10 characters long');
      }

      const { data: result, error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            budget,
            status: 'new',
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to submit inquiry');
      }

      // Track submission for rate limiting
      const submissions = getRateLimitKey();
      submissions.push(Date.now());
      setRateLimitKey(submissions);

      return result?.[0];
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    }
  },

  // Get all contact inquiries (for admin dashboard)
  async getInquiries() {
    if (!supabase) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }
  },

  // Update inquiry status
  async updateInquiryStatus(id, status) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data?.[0];
    } catch (error) {
      console.error('Error updating inquiry:', error);
      throw error;
    }
  },

  // Delete an inquiry
  async deleteInquiry(id) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }
    try {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  },

  // Subscribe to real-time updates
  subscribeToInquiries(callback) {
    if (!supabase) {
      return () => {};
    }
    const subscription = supabase
      .from('contact_inquiries')
      .on('*', payload => {
        callback(payload);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  },

  // Get real-time channel for live updates
  getRealtimeChannel() {
    if (!supabase) {
      return null;
    }
    return supabase.channel('contact_inquiries_changes').on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'contact_inquiries',
      },
      payload => {
        return payload;
      }
    );
  },
};
