import posthog from 'posthog-js';

export default function finishedPrompt(userPrompt, prompt, promptType) {
    posthog.capture(
        'finished_prompt',
        {
            userPrompt,
            prompt,
            promptType
        }
    );

}