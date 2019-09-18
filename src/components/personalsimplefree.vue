<template>
  <div id="psf-wrapper">
    <div id="psf-buttons">
      <h1><button @click="selectedPSF = 'PERSONAL'" :class="{'selected': selectedPSF == 'PERSONAL'}">PERSONAL</button></h1>
      <h1><button @click="selectedPSF = 'SIMPLE'" :class="{'selected': selectedPSF == 'SIMPLE'}">SIMPLE</button></h1>
      <h1><button @click="selectedPSF = 'FREE'" :class="{'selected': selectedPSF == 'FREE'}">FREE</button></h1>
    </div>
    <p v-show="selectedPSF == 'PERSONAL'">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas autem tempora, asperiores facilis sunt, recusandae quod reiciendis, debitis id officia fuga! Molestiae fugit ut ducimus repudiandae? Non harum maxime amet, vitae soluta iure odit accusantium, ratione omnis totam et? Nihil, molestias hic. Alias quae deleniti esse tenetur? Tenetur pariatur beatae nobis ut earum, officia molestias similique aspernatur. Laboriosam non id fugit porro, minus veritatis! Beatae numquam culpa ex modi ipsam reprehenderit at explicabo itaque eos deserunt sint nostrum possimus quas mollitia, dolores non! Mollitia laudantium quos nesciunt. Molestias vitae, placeat corporis in, amet laboriosam quibusdam voluptatem dolorem perferendis ducimus laborum!</p>
    <p v-show="selectedPSF == 'SIMPLE'">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos blanditiis obcaecati et quas! Sed laboriosam ad alias tempora pariatur nemo sequi ipsa provident temporibus nobis officiis nulla, soluta distinctio numquam vel dicta quibusdam corporis assumenda. Adipisci esse necessitatibus voluptatem sequi atque vero voluptate ipsa suscipit animi eum, exercitationem vitae. Consectetur, cum. Quaerat recusandae est dolorum veniam nihil, aspernatur consequuntur temporibus voluptas, rerum ut molestias aliquam labore accusantium dolor odit placeat dolore expedita quibusdam eaque dolorem eius a ullam. Laboriosam velit libero ipsa qui minima laborum non amet sunt, magni blanditiis similique et voluptate commodi. Possimus incidunt quos nam nihil quas?</p>
    <p v-show="selectedPSF == 'FREE'">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta pariatur velit vitae fuga quod unde illo repellat, quae, amet harum culpa ex quisquam praesentium itaque. Voluptate similique omnis perferendis id! Doloremque saepe aut suscipit autem esse, impedit optio distinctio quas enim similique sed veritatis odio nemo dolore. Tempora officia accusamus ad ex voluptas id natus nisi voluptates, quo iste hic autem impedit facilis qui! Beatae, suscipit sequi fugiat repellat incidunt a alias rerum eos eius aperiam fuga illum nulla reiciendis optio praesentium! Quasi deserunt aperiam incidunt sequi! Doloremque quae tempora quia temporibus recusandae rem minus porro iure, asperiores, voluptatem earum?</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPSF: "PERSONAL"
    };
  }
};
</script>

<style>
#psf-buttons {
  display: flex;
  justify-content: center;
}
#psf-wrapper button {
  font-family: "Montserrat";
  font-size: 2rem;
  background-color: white;
  border: none;
  outline: none;
  box-shadow: 0px 5px 13px -2px #00000040;
  border-radius: 2rem;
  width: 325px;
  height: 125px;
  margin: 15px;
  transition: box-shadow 0.2s ease;
}
#psf-wrapper button.selected {
  box-shadow: 0px 1px 0px -2px #00000040;
}
#psf-wrapper p {
  text-align: center;
  margin: 20px auto;
  font-size: 1.75rem;
  width: 80%;
}
</style>