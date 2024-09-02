import {GoogleGenerativeAI} from '@google/generative-ai'
import {GoogleAIFileManager} from '@google/generative-ai/server'; 
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
export const apiFileAI = new GoogleAIFileManager(process.env.GEMINI_API_KEY)
