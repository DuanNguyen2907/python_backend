class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('symptoms')) {
      const symptomString = message.replace("symptoms: ", "");
      const symptomArray = symptomString.split(",");
      this.actionProvider.handlePrediction(symptomArray);
    } else {
      this.actionProvider.handleMessageError();
    }
  }
}

export default MessageParser;