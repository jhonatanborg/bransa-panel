<template>
  <div class="primary lighten-2 fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="4">
        <v-card class="pa-5">
          <v-text-field
            solo
            prepend-inner-icon="mdi-email"
            placeholder="E-mail"
            v-model="value"
          ></v-text-field>
          <v-text-field
            solo
            prepend-inner-icon="mdi-lock"
            placeholder="Senha"
            v-model="value"
          ></v-text-field>
          <v-btn depressed color="primary lighten-3" block>Entrar</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
