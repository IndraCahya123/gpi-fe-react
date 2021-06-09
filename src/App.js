import { Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import swal from "sweetalert";

import "./App.css";

function App() {
  const [input, setInput] = useState({
    fullname: "",
    age: "",
    city: "",
    fullInput: "",
  });

  const getAge = (sentence) => {
    let age = [];
    const sentenceArr = sentence.split("");
    for (let i = 1; i < 10; i++) {
      sentenceArr.forEach((number) => {
        if (number == i) {
          age.push(number);
        }
      });
    }

    return age.join("");
  };

  const separateSentence = (sentence) => {
    const age = getAge(sentence);

    const modifiedSentence = sentence.replace(age, ",");
    const separate = modifiedSentence.split(",");
    return separate;
  };

  const onSubmit = () => {
    addData.isSuccess
      ? swal("Success", "Success to Add Data", "success")
      : swal("Failed", "Failed to add data", "warning");
  };

  const onChange = (e) => {
    const tempForm = { ...input };
    tempForm[e.target.name] = e.target.value;

    setInput({
      ...tempForm,
    });
  };

  const addData = useMutation(async () => {
    const inputData = separateSentence(input.fullInput.toUpperCase());

    const fullname = inputData[0];
    const age = getAge(input.fullInput.toUpperCase());
    const city = inputData[1];

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = {
      fullname: fullname.substr(0, fullname.length - 1),
      age,
      city: city,
    };

    const body = JSON.stringify(data);

    await axios.post("http://127.0.0.1:8000/api/add-data", body, config);

    onSubmit();
  });

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Form className="d-flex flex-column align-items-center w-75">
        <Form.Control
          name="fullInput"
          onChange={(e) => onChange(e)}
          placeholder="Input your data here (Fullname[space]Age[space]City, e.g Indra 21 Bali)"
        />
        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={() => addData.mutate()}
        >
          Submit
        </button>
      </Form>
    </div>
  );
}

export default App;
