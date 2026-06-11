const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanarasheed11222_db_user:OkpdqfqipIB5MkfC@cluster0.fid1fhw.mongodb.net/luxemart?appName=Cluster0')
.then(() => { console.log('Connected!'); process.exit(0); })
.catch(err => { console.log('Error:', err.message); process.exit(1); });
