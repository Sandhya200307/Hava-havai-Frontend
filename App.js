import React, { useState } from 'react';
import { Button, Form, FormField, TextInput, Text } from '@react-spectrum/form';
import { Flex, Item } from '@react-spectrum/layout';
import { Provider } from '@react-spectrum/provider';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [mockDB, setMockDB] = useState({}); // mock database
  const [error, setError] = useState(null); // error state

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email) {
      setError('Please fill in both name and email fields');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    const newData = { name, email };
    setData((prevData) => [...prevData, newData]);
    setMockDB((prevDB) => ({ ...prevDB, [newData.name]: newData }));
    setName('');
    setEmail('');
    setError(null);
  };

  const handleDelete = (name) => {
    setData((prevData) => prevData.filter((item) => item.name !== name));
    setMockDB((prevDB) => {
      const { [name]: deletedItem, ...rest } = prevDB;
      return rest;
    });
  };

  return (
    <Provider>
      <Flex direction="column" gap="size-200">
        <Form onSubmit={handleSubmit}>
          <FormField label="Name">
            <TextInput value={name} onChange={(value) => setName(value)} />
          </FormField>
          <FormField label="Email">
            <TextInput value={email} onChange={(value) => setEmail(value)} />
          </FormField>
          {error && (
            <Text slot="description" color="negative">
              {error}
            </Text>
          )}
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Form>
        <Text>Data:</Text>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name} - {item.email}
              <Button variant="negative" onClick={() => handleDelete(item.name)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </Provider>
  );
}

export default App;
