<script setup>
  import Header from './components/Header.vue';
</script>

<template>

  <Header/>

</template>

<style>

  body {
    margin: 0 auto;
    padding: 50px;
    font-family: Arial, sans-serif;
    text-align: center;
    background-image: url('/imagenFondo.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  h1 {
    color: #e76018;
  }

  form {
    margin-bottom: 20px;
  }

  p {
    color: white;
    text-transform: uppercase;
    font-weight: bold;
  }

  span {
    color: black;
    font-weight: bold;
  }

  input {
    padding: 8px;
    width: 80%;
    font-size: 16px;
  }

  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin: 10px;
  }

  button:hover {
    background-color: #45a049;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .modificar {
    background-color: #4CAF50;
  }

  .modificar:hover {
    background-color: #45a049;
  }

  .eliminar {
    background-color: red;
  }

  .eliminar:hover {
    background-color: darkred;
  }

  li button {
    color: white;
    border: none;
    cursor: pointer;
  }

</style>
