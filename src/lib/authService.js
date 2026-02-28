import { supabase } from './supabase';

/**
 * Admin Authentication Service
 * Supports two methods:
 * 1. admin_users table (username + password/PIN)
 * 2. admin_pins table (linked to Supabase auth.users)
 */

/**
 * Hash password using SHA256
 */
const hashPassword = async password => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Verify admin credentials using admin_users table (username + password)
 * @param {string} username - Admin username
 * @param {string} password - Admin password (plain text)
 * @returns {Promise<{success: boolean, message: string, adminId?: string}>}
 */
export const verifyAdminCredentials = async (username, password) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    // Fetch admin user from database
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: 'Invalid username or password',
      };
    }

    // Hash input password and compare
    const inputHash = await hashPassword(password);

    if (inputHash === data.password_hash) {
      return {
        success: true,
        message: 'Authentication successful',
        adminId: data.id,
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password',
      };
    }
  } catch (err) {
    console.error('Authentication error:', err);
    return {
      success: false,
      message: 'Authentication service error',
    };
  }
};

/**
 * Verify admin PIN using admin_users table
 * @param {string} username - Admin username
 * @param {string} pin - Admin PIN (plain text, 4-6 digits)
 * @returns {Promise<{success: boolean, message: string, adminId?: string}>}
 */
export const verifyAdminPin = async (username, pin) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    // Fetch admin user from database
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, pin_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: 'Invalid username or PIN',
      };
    }

    // Check if PIN is set
    if (!data.pin_hash) {
      return {
        success: false,
        message: 'PIN not set for this user',
      };
    }

    // Compare PIN directly (plain text comparison - easy to set up)
    if (pin === data.pin_hash) {
      return {
        success: true,
        message: 'Authentication successful',
        adminId: data.id,
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or PIN',
      };
    }
  } catch (err) {
    console.error('PIN authentication error:', err);
    return {
      success: false,
      message: 'Authentication service error',
    };
  }
};

/**
 * Verify admin PIN using admin_pins table (linked to Supabase auth.users)
 * This requires the user to be authenticated via Supabase Auth first
 * @param {string} userId - Supabase auth user ID
 * @param {string} pin - Admin PIN (plain text)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const verifyAdminPinFromAuth = async (userId, pin) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    // Fetch PIN for the user
    const { data, error } = await supabase
      .from('admin_pins')
      .select('pin')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: 'No PIN set for this user',
      };
    }

    // Compare PIN directly (you can also hash it for more security)
    if (pin === data.pin) {
      return {
        success: true,
        message: 'PIN verification successful',
      };
    } else {
      return {
        success: false,
        message: 'Invalid PIN',
      };
    }
  } catch (err) {
    console.error('PIN verification error:', err);
    return {
      success: false,
      message: 'PIN verification service error',
    };
  }
};

/**
 * Set or update admin PIN for a user (requires Supabase Auth)
 * @param {string} userId - Supabase auth user ID
 * @param {string} pin - New PIN
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const setAdminPin = async (userId, pin) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    const { error } = await supabase.from('admin_pins').upsert(
      {
        user_id: userId,
        pin: pin,
        updated_at: new Date(),
      },
      { onConflict: 'user_id' }
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'PIN set successfully',
    };
  } catch (err) {
    console.error('Error setting PIN:', err);
    return {
      success: false,
      message: 'Failed to set PIN',
    };
  }
};

/**
 * Create a new admin user (for setup/management)
 * @param {string} username - New admin username
 * @param {string} password - New admin password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const createAdminUser = async (username, password) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    const passwordHash = await hashPassword(password);

    const { error } = await supabase.from('admin_users').insert([
      {
        username,
        password_hash: passwordHash,
        created_at: new Date(),
      },
    ]);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Admin user created successfully',
    };
  } catch (err) {
    console.error('Error creating admin user:', err);
    return {
      success: false,
      message: 'Failed to create admin user',
    };
  }
};

/**
 * Update admin password
 * @param {string} adminId - Admin user ID
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const updateAdminPassword = async (adminId, newPassword) => {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase not configured',
    };
  }
  try {
    const passwordHash = await hashPassword(newPassword);

    const { error } = await supabase
      .from('admin_users')
      .update({ password_hash: passwordHash })
      .eq('id', adminId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (err) {
    console.error('Error updating password:', err);
    return {
      success: false,
      message: 'Failed to update password',
    };
  }
};

/**
 * List all admin users
 * @returns {Promise<Array>}
 */
export const listAdminUsers = async () => {
  if (!supabase) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching admin users:', err);
    return [];
  }
};
