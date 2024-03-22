const { YoutubeTranscript } = require('youtube-transcript'); // npm i youtube-trnascript
const { Translate } = require('@google-cloud/translate').v2;

// Initialize the Google Cloud Translation client
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // Set your Google Cloud project ID in environment variables
  keyFilename: 'path/to/your/google-cloud-keyfile.json' // Provide the path to your Google Cloud key file
});

async function translateText(text, targetLanguage) {
  try {
    let [translations] = await translate.translate(text, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations.join('\n');
  } catch (error) {
    console.error('Error during translation:', error);
    return null;
  }
}

async function main() {
  const videoId = 'YOUR_VIDEO_ID'; // Replace with your YouTube video ID
  const targetLanguage = 'es'; // The language you want to translate to

  // Fetch transcript using youtube-transcript
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const combinedText = transcript.map(segment => segment.text).join(' ');

    // Translate transcript
    const translatedText = await translateText(combinedText, targetLanguage);
    console.log(translatedText);
  } catch (error) {
    console.error('Failed to fetch or translate transcript:', error);
  }
}

main().catch(console.error);
