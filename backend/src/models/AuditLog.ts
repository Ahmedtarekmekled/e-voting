import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actor: { type: String, enum: ['admin', 'voter'], required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);
