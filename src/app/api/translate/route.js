const {google} = require('googleapis');
const {Translate} = require('@google-cloud/translate').v2;

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY // Set your API key in environment variables
});

// Initialize the Google Cloud Translation client
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // Set your Google Cloud project ID in environment variables
  keyFilename: 'path/to/your/google-cloud-keyfile.json' // Provide the path to your Google Cloud key file
});

// try with caption instead of transcript?
async function getVideoCaptions(videoId, languageCode) {
  try {
    const response = await youtube.captions.list({
      part: 'snippet',
      videoId: videoId
    });

    const captions = response.data.items;
    let captionId = null;
    for (let caption of captions) {
      if (caption.snippet.language === languageCode && caption.snippet.trackKind !== 'ASR') {
        captionId = caption.id;
        break;
      }
    }

    if (!captionId) {
      console.log('No suitable caption track found');
      return null;
    }

    const captionResponse = await youtube.captions.download({
      id: captionId,
      tfmt: 'srt' // or 'vtt' for WebVTT format
    }, {
      responseType: 'text'
    });

    return captionResponse.data;
  } catch (error) {
    console.error('Error fetching video captions:', error);
    return null;
  }
}

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

  // fetch options from the form later
  const videoId = 'YOUR_VIDEO_ID'; // Replace with your YouTube video ID
  const sourceLanguage = 'en'; // The language of the video captions
  const targetLanguage = 'es'; // The language you want to translate to

  // Fetch captions
  const captions = await getVideoCaptions(videoId, sourceLanguage);
  if (!captions) {
    console.log('Failed to fetch captions.');
    return;
  }

  // Translate captions
  const translatedCaptions = await translateText(captions, targetLanguage);
  console.log(translatedCaptions);
}

main().catch(console.error);
