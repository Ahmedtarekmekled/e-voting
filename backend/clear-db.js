// Clear MongoDB Database Script
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/evoting';

async function clearDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`📂 Found ${collections.length} collections\n`);

    // Clear each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      const result = await db.collection(collectionName).deleteMany({});
      console.log(`🗑️  Cleared "${collectionName}": ${result.deletedCount} documents deleted`);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ DATABASE COMPLETELY CLEARED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verify empty
    console.log('📊 Verification:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${count} documents`);
    }

    await mongoose.connection.close();
    console.log('\n✅ MongoDB connection closed');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearDatabase();
