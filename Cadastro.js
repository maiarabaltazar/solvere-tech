import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import axios from "axios"; // Importe o Axios aqui

const Stack = createStackNavigator();

const Cadastro = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
    });
  }, [navigation]);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleGravar = async () => {
    if (nome && telefone && email && senha) {
      const dados = {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      };

      // Fazer a requisição POST para o backend usando Axios
      try {
        const response = await axios.post(
          "http://192.168.0.129:3000/gravar",
          dados,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Verificar se a resposta contém a mensagem
        if (response.data.message) {
          alert(response.data.message);
          // Navegar de volta para a tela principal após cadastro bem-sucedido
          navigation.navigate("Login");
        } else {
          alert("Erro ao cadastrar, tente novamente.");
        }
      } catch (error) {
        console.error(
          "Erro na requisição:",
          error.response ? error.response.data : error.message
        );
        alert("Erro na requisição. Tente novamente mais tarde.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display1}>CADASTRO</Text>

      <Text style={styles.label}>NOME COMPLETO</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome completo aqui!"
      />

      <Text style={styles.label}>TELEFONE</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        placeholder="Digite seu telefone aqui!"
      />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Digite seu email aqui!"
      />

      <Text style={styles.label}>SENHA</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        placeholder="Digite sua senha aqui!"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleGravar}>
        <Text style={styles.loginButtonText}>ENVIAR</Text>
      </TouchableOpacity>

      <Image
        style={styles.imagemLogo}
        resizeMode="stretch"
        source={require("./imagens/SOLVERE TECH.png")}
      />

      <Text style={styles.copy}>
        © 2024 Solvere Tech. Todos os direitos reservados.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA27F", // Altera a cor do background
    padding: 10,
    justifyContent: "space-between",
  },
  display1: {
    marginLeft: 10, // Margem esquerda do texto
    marginVertical: 25,
    fontSize: 25,
    textAlign: "center", // Centraliza o texto
    fontWeight: "bold",
    color: "#000", // Cor do texto
  },
  label: {
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
    fontSize: 22,
    color: "#000", // Cor do texto
  },
  input: {
    marginVertical: 10,
    marginTop: 2,
    backgroundColor: "#FFF",
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 15, // Margem esquerda
    padding: 2, // Espaço interno
    paddingLeft: 10,
    width: 370,
    placeholderTextColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: "#FF6969", // Cor do botão
    borderColor: "#000000", // Cor da borda
    borderWidth: 1, // Largura da borda
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    marginVertical: 20,
    width: 200,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagemLogo: {
    width: 90, // Largura
    height: 90, // Altura
    marginVertical: 20,
    marginTop: 30, // Margem da figura no topo para elemento anterior, caixa de entrada
    alignSelf: "center",
  },
  copy: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 15,
  },
});

export default Cadastro;
