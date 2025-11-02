import Activity from '../Models/ActivityModel.js'
import { getIO } from '../Socket.js';

const logActivity = async (payload = {}) => {
  const { userId, actionType, text, iconColor } = payload || {};
  if (!userId || !actionType || !text || !iconColor) {
    console.warn('logActivity: missing required fields', {
      userId: !!userId, actionType: !!actionType, text: !!text, iconColor: !!iconColor, payload
    });
    return null;
  }

  try {
    const activity = await Activity.create({
      userId,
      actionType,
      text,
      iconColor
    });

    let io = null;
    try { io = (typeof getIO === 'function') ? getIO() : getIO; } catch {}
    if (io) io.emit('new-activity', activity);

    return activity;
  } catch (err) {
    console.error('Failed to log activity:', err);
    return null;
  }
};

export default logActivity;