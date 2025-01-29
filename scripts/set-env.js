const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = envContent
  .split('\n')
  .filter(line => line && !line.startsWith('#'))
  .reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('='); // Rejoin in case value contains =
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

// Set each environment variable in Netlify
Object.entries(envVars).forEach(([key, value]) => {
  try {
    execSync(`netlify env:set ${key} "${value}"`, {
      stdio: 'inherit',
    });
    console.log(`✅ Set ${key}`);
  } catch (error) {
    console.error(`❌ Failed to set ${key}: ${error.message}`);
  }
});
