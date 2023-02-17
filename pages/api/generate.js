import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const basePromptPrefix = "analyze the following programming code and provide a detailed explanation of what the code is doing, step-by-step. give the answers as points";
// const generateAction = async (req, res) => {
//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.5,
//     max_tokens: 500,
//   });
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;

const basePromptPrefix =
`
analyze the following programming code and provide a detailed explanation of what the code is doing, step-by-step. give the answers as points
`

const generateAction = async (req, res) => {

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.5,
    max_tokens: 1250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  explain each lines in depth in simple manner and better methods if exists


  Title: ${req.body.userInput}

  Table of Contents: ${basePromptOutput.text}

  Blog Post:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.5,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;