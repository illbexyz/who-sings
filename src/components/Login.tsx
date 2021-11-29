import { Button, FormControl, Input } from "native-base";
import React, { useState } from "react";
import { useStore } from "../store/store";

export default function Login() {
  const login = useStore((store) => store.login);
  const [username, setUsername] = useState("");

  return (
    <>
      <FormControl>
        <FormControl.Label _text={{ fontSize: "lg" }}>
          What's your name?
        </FormControl.Label>

        <Input value={username} onChangeText={setUsername}></Input>
      </FormControl>

      <Button
        mt="4"
        disabled={!username.length}
        onPress={() => login(username)}
      >
        Login
      </Button>
    </>
  );
}
