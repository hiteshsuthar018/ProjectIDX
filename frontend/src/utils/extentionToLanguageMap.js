
const extentionToLanguageMap = {
    'js':'javascript',
    'jsx':'javascript',
    'ts':'typescript',
    'tsx':'typescript',
    'py':'python',
    'java':'java',
    'c':'c',
    'cpp':'cpp',
    'cs':'csharp',
    'rb':'ruby',
    'php':'php',
    'html':'html',
    'css':'css',
    'json':'json',
    'xml':'xml',
    'go':'go',
    'rs':'rust',
    'swift':'swift',
    'kt':'kotlin',
    'm':'objective-c',
    'sh':'shell',
    'sql':'sql',
    // add more extensions and their corresponding languages as needed
};

export const extenstionMapToLanguage = (extenstion)=>{

    return extentionToLanguageMap[extenstion] || 'plaintext';
}