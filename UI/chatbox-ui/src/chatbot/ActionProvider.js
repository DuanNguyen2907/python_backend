class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handlePrediction = async (symptoms) => {
    try {
      const response = await fetch('http://localhost:5000/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms }), 
      });

      const data = await response.json();

      const message = this.createChatBotMessage("Bạn có thể đang bị " + data.disease_name);
      const descMessage = this.createChatBotMessage(data.disease_desc,
        {
          withAvatar: false,
          delay: 1000,
          widget: "overview"
        });
      const adviceMessage = this.createChatBotMessage(data.disease_advice,
        {
          withAvatar: false,
          delay: 2000,
          widget: "overview"
        });

      this.setState((prevState) => {
        console.log(prevState);
        return {
          ...prevState,
          messages: [...prevState.messages, message, descMessage, adviceMessage],
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleMessageError = () => {
    const errorMessage = this.createChatBotMessage("you have entered the wrong syntax. Please enter the correct syntax: \"symptoms:symptom1,symptom2,etc\"")
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, errorMessage],
    }));
  }
}

export default ActionProvider;