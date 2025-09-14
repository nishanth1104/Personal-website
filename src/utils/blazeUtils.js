import blazeData from "../constants/blazeData";

export function getBlazeResponse(userInput) {
  const input = userInput.toLowerCase();

  for (let item of blazeData) {
    if (item.question.some(q => input.includes(q))) {
      return item.answer;
    }
  }

  // fallback response
  return "I am sorry, I am just Nishanth's personal assistant.";
}
