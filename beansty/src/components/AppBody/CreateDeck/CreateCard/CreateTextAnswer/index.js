import './CreateTextAnswer.css';

function CreateTextAnswer ({answer, onAnswer}) {
  return (
    <div className="create-text-answer">
      <div className="create-answer-label">
        Answer: 
      </div>
      <textarea
        className="create-text-answer-field"
        placeholder="Correct Answer (512 Characters)"
        maxLength="512"
        form="create-deck-form"
        onChange={e => {onAnswer({answer: e.target.value})}}
        required
        value={answer}/>
    </div>
  );
}

export default CreateTextAnswer;
