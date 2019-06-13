<template>
  <div class="church-info-container">
    <div class="church-info">
      <div class="edit-button noselect">
        <i class="material-icons">
          edit
        </i>
      </div>
      <label for="">Church Name</label>
      <br>
      <input type="text" v-model="churchName" :readonly="readOnly"
        class="main">
      <br>    
      <label for="">Nickname</label>
      <br>
      <input type="text" v-model="nickname" :readonly="readOnly"
        class="main">
      <br>
      <label for="">Statement of Faith</label>
      <br>
      <textarea name="" class="main" :readonly="readOnly"
        v-model="statementOfFaith"></textarea>
      <br>
      <label for="">Description</label>
      <br>
      <textarea name="" class="main" :readonly="readOnly"
        v-model="description"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      readOnly: true,
      churchName: 'Auburn Community Church',
      nickname: 'ACC',
      statementOfFaith: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis voluptate natus ullam laborum vitae esse cum ea. Cumque non ex exercitationem beatae temporibus placeat earum corrupti mollitia at vel quia suscipit consectetur quis, numquam ut optio accusamus vero voluptatibus quos officiis? Non, esse recusandae saepe quaerat ipsam voluptatibus, amet, repellendus ipsa dolores distinctio aspernatur veniam sapiente in quae ut ea labore provident molestias ratione atque inventore minus! Iste quae dolor, eos rem quaerat quod sequi odit ut in fugiat incidunt mollitia earum architecto dolorem eius repudiandae eaque neque deserunt at vero quos porro ipsum officiis necessitatibus. Quia quae optio velit, tenetur sunt officia soluta repellat enim nobis doloremque ullam eum, fugiat animi minus tempore iste deleniti omnis! Aut illo perspiciatis deserunt temporibus labore, rerum earum eaque praesentium necessitatibus dolorum, quia sed iusto dignissimos minima voluptatem nulla consequuntur? Delectus magnam expedita perferendis debitis odit sunt fugit, rem nostrum beatae non nemo quae, temporibus quaerat quia ipsum consequuntur! Itaque, expedita quod perferendis odit tenetur similique adipisci est iure molestiae saepe voluptatem harum fugiat rem quam iusto! Assumenda nesciunt sit facilis omnis mollitia repellendus aliquid alias qui atque! Ad iusto ipsa quisquam illum aliquid porro dolorum in, consequatur, incidunt commodi perferendis consectetur mollitia eveniet cumque a itaque enim dolor? Atque at sequi, quisquam incidunt dolor doloremque nobis facere laboriosam dicta neque, totam consequuntur, voluptate aut velit necessitatibus nemo cumque perferendis maxime voluptatum magni reprehenderit maiores? Ut ipsa accusantium recusandae suscipit rerum! Magnam quidem impedit possimus cum quae praesentium ullam voluptatum obcaecati fuga quasi rem, quod ea dicta molestiae totam amet itaque exercitationem omnis ad facere soluta. Accusamus magnam, doloribus repellat molestias unde dicta maiores expedita corrupti iste sequi obcaecati consequatur laboriosam debitis praesentium numquam dolor soluta sapiente saepe nam blanditiis cum fugit ipsa nihil dignissimos! Ducimus quos ut nostrum repellat neque dolorum optio suscipit corrupti. Expedita deserunt a commodi vitae accusantium omnis natus! Maxime neque earum provident, ratione nihil, pariatur obcaecati dolorum ex aspernatur illum, unde eveniet non sed laborum placeat soluta similique voluptas fuga id modi consequatur. Nisi maxime, doloribus sit ducimus nulla nostrum quos, perspiciatis voluptates dignissimos obcaecati, a quibusdam! Et in eos provident quis aliquid laudantium illum. At repellendus vitae quidem iusto magnam omnis a accusantium distinctio dolorem maiores id aperiam tempore saepe magni ipsam ex enim recusandae doloremque itaque, quo ullam culpa! Ullam repellendus quos quis neque minima quibusdam optio illo asperiores ex? Hic veritatis excepturi fugit, itaque molestiae dolore in eveniet, tenetur impedit nobis pariatur veniam voluptatem est asperiores non numquam doloribus tempora ipsam doloremque nostrum ut! Quia consectetur eos, provident facilis unde reprehenderit, illo non architecto rem pariatur assumenda dolore distinctio similique fugiat magnam. Rerum at placeat quas, magni similique inventore harum? Nesciunt eius fuga esse, ullam possimus, similique quas officia eligendi nisi dolorum quidem molestiae commodi ipsum! At maiores saepe est rem ullam excepturi quidem, ipsa, quis, amet laudantium molestias provident dicta nulla aut? Explicabo nobis, nulla, sunt repellendus, ab distinctio eligendi consequuntur quisquam eos molestiae debitis placeat aperiam mollitia totam ipsa dolore. Soluta quam deleniti libero voluptatem dolor dignissimos sequi asperiores commodi fugit repellat, laboriosam saepe laudantium ipsum. Nulla molestias ipsam nisi, quis eius praesentium rerum? Fugiat, similique voluptatum animi officiis corrupti enim itaque vitae maxime quis, explicabo iure totam delectus autem dolores? Ipsum sunt ad inventore pariatur sed quaerat ipsa fugiat, recusandae, ipsam alias corporis, labore quo cumque aspernatur eligendi laborum reprehenderit repellat nulla et consequatur eveniet? Facere doloremque possimus numquam iste eius, natus ullam quae accusantium modi error magni laborum! Voluptates, voluptate? Sunt, ea alias. Dolor repellendus ipsam impedit temporibus distinctio laborum culpa atque dolorum vitae. Aperiam odit ullam error magnam doloribus, hic odio cum, repudiandae laudantium voluptates at unde, recusandae aliquid earum quaerat. Quasi veniam saepe officiis aspernatur beatae quibusdam doloribus libero exercitationem nobis sint possimus nihil optio odit, ullam reprehenderit dolor explicabo, recusandae debitis voluptatibus cum excepturi. Aliquid nam eaque laborum odio dignissimos quisquam natus. Ea repellendus quas cupiditate sed quam consequatur unde similique possimus vel nam quod repudiandae voluptate fugiat a dignissimos, nisi, saepe ab, ad repellat quo! Minus dolores quisquam maxime tempore quidem voluptate eius quis veniam aperiam officia doloremque odio et nam non sunt, voluptatem blanditiis numquam, voluptatibus vero! Tempore sit quia officia a, impedit ullam? Voluptas quae consequuntur cum reiciendis odio quod porro iure saepe nulla, aliquam quas fugit provident labore molestiae veritatis incidunt autem temporibus perspiciatis in quisquam natus quos. Laborum illum, numquam enim odio ea perferendis reprehenderit mollitia tempora dolorem quas quae? Dolor itaque vel similique assumenda totam iste? Laudantium quas tempora eligendi ratione unde reprehenderit sapiente mollitia ipsum provident in numquam dolor libero consectetur praesentium quasi perferendis rem blanditiis excepturi, est quia facilis! Tenetur omnis fuga commodi molestias modi asperiores nesciunt recusandae nam tempore quisquam voluptatem consequatur, esse nisi quasi ut iste? Incidunt nobis quam numquam quos, laudantium corrupti non labore, recusandae iure nulla consequuntur a, deleniti quasi voluptates ea? Odit similique commodi error dolorum laborum obcaecati non nulla quo tempore, aperiam consequuntur, est natus delectus? Illo, corporis dicta repudiandae adipisci nesciunt recusandae sint a asperiores nemo soluta esse impedit aut doloremque laboriosam fugit praesentium omnis fuga iure quam voluptate eligendi quos animi libero! Molestias ea explicabo, minima dolorum est excepturi ratione quae debitis minus similique vero neque! Voluptates iste, tempore earum quisquam odit dicta nobis blanditiis cum. Perspiciatis nemo facilis explicabo ex saepe dicta quaerat quas temporibus, itaque eum nisi unde adipisci nobis corporis dolorem eius quidem blanditiis voluptatibus consectetur tempore illo laudantium natus doloribus maxime. Dolorum mollitia libero aliquam voluptatem pariatur laudantium labore exercitationem, reprehenderit dolore temporibus! Delectus culpa consectetur fugiat tenetur blanditiis vel libero dolore, at sequi sit dicta repellendus laboriosam incidunt? Velit distinctio quaerat voluptates vel ipsa neque modi facilis ratione? Id, dicta? Pariatur corporis ab ullam magnam voluptatibus et eos quibusdam dolores odit, cupiditate vero maxime quis tempore omnis totam corrupti modi, perferendis esse asperiores deleniti. Fugiat adipisci ipsum illo ea sint accusamus tenetur quasi, maiores cupiditate repellat voluptate inventore. Magni ipsam mollitia, dolorum ab natus ut, doloribus sed possimus id quaerat similique eligendi corporis adipisci fugit? Ipsa, numquam. Officia tenetur praesentium ipsum beatae sapiente id ea dignissimos, impedit quasi aspernatur odit sequi accusamus illum deserunt, autem dolor laboriosam reprehenderit! Maiores, aperiam nihil hic inventore odit fugit placeat eligendi adipisci, laboriosam commodi libero a reprehenderit voluptas perspiciatis cumque eum numquam nesciunt non. Assumenda error nisi, excepturi ut perferendis delectus et labore, id exercitationem quod quia ea! Itaque laudantium est nihil ad aperiam facere iusto minima, rem vitae expedita, quasi exercitationem, neque illo eaque laboriosam nobis quaerat ratione! Commodi, eaque. Quidem, sunt nobis! Voluptatibus, soluta nam, suscipit praesentium architecto et assumenda consequuntur aut repellat recusandae odio, asperiores quaerat cumque. Quae, sint. Eveniet minus quibusdam dolorem modi similique quo consectetur dignissimos a praesentium labore. Suscipit repellat modi voluptatem neque excepturi soluta cupiditate eaque, doloribus impedit consequatur vitae incidunt non recusandae magni! Placeat culpa in repellat fugit doloremque animi sint ut inventore debitis ducimus assumenda quidem veritatis nostrum odio porro, molestiae facilis corrupti error dolorum dolores magnam beatae sit nemo! Eos nostrum sequi ea voluptatem culpa praesentium voluptatibus, repudiandae quo dolorum soluta. Placeat quae aut perferendis consequatur, provident cumque incidunt dolore laborum asperiores. Voluptatibus mollitia reprehenderit maiores, ea sit harum reiciendis. Distinctio illum quasi quos, obcaecati ullam at. Voluptates itaque ducimus soluta. Dolorem laudantium culpa consequuntur corporis praesentium optio possimus numquam, accusamus nulla incidunt dicta earum saepe? Harum aspernatur earum, doloribus, eveniet iusto itaque accusantium sed in et impedit aliquam odio officia distinctio, fuga non ea repellendus eum ipsa nobis. Totam, alias unde reprehenderit ad eveniet laudantium possimus commodi neque quibusdam debitis hic, consequuntur earum nam autem facilis repudiandae sit ipsam? Atque sed aspernatur amet quisquam facilis id reiciendis, odio debitis molestias minima aut. Voluptatum id dolore laboriosam? Reprehenderit a, dicta fugit ipsa neque sint iure earum exercitationem nisi accusantium odit sit ullam deserunt qui quam error, minima omnis maiores quibusdam, labore debitis necessitatibus aliquid harum. Laboriosam suscipit repellat, saepe inventore nihil optio deleniti magni, itaque exercitationem doloremque nulla fugi',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis voluptate natus ullam laborum vitae esse cum ea. Cumque non ex exercitationem beatae temporibus placeat earum corrupti mollitia at vel quia suscipit consectetur quis, numquam ut optio accusamus vero voluptatibus quos officiis? Non, esse recusandae saepe quaerat ipsam voluptatibus, amet, repellendus ipsa dolores distinctio aspernatur veniam sapiente in quae ut ea labore provident molestias ratione atque inventore minus! Iste quae dolor, eos rem quaerat quod sequi odit ut in fugiat incidunt mollitia earum architecto dolorem eius repudiandae eaque neque deserunt at vero quos porro ipsum officiis necessitatibus. Quia quae optio velit, tenetur sunt officia soluta repellat enim nobis doloremque ullam eum, fugiat animi minus tempore iste deleniti omnis! Aut illo perspiciatis deserunt temporibus labore, rerum earum eaque praesentium necessitatibus dolorum, quia sed iusto dignissimos minima voluptatem nulla consequuntur? Delectus magnam expedita perferendis debitis odit sunt fugit, rem nostrum beatae non nemo quae, temporibus quaerat quia ipsum consequuntur! Itaque, expedita quod perferendis odit tenetur similique adipisci est iure molestiae saepe voluptatem harum fugiat rem quam iusto! Assumenda nesciunt sit facilis omnis mollitia repellendus aliquid alias qui atque! Ad iusto ipsa quisquam illum aliquid porro dolorum in, consequatur, incidunt commodi perferendis consectetur mollitia eveniet cumque a itaque enim dolor? Atque at sequi, quisquam incidunt dolor doloremque nobis facere laboriosam dicta neque, totam consequuntur, voluptate aut velit necessitatibus nemo cumque perferendis maxime voluptatum magni reprehenderit maiores? Ut ipsa accusantium recusandae suscipit rerum! Magnam quidem impedit possimus cum quae praesentium ullam voluptatum obcaecati fuga quasi rem, quod ea dicta molestiae totam amet itaque exercitationem omnis ad facere soluta. Accusamus magnam, doloribus repellat molestias unde dicta maiores expedita corrupti iste sequi obcaecati consequatur laboriosam debitis praesentium numquam dolor soluta sapiente saepe nam blanditiis cum fugit ipsa nihil dignissimos! Ducimus quos ut nostrum repellat neque dolorum optio suscipit corrupti. Expedita deserunt a commodi vitae accusantium omnis natus! Maxime neque earum provident, ratione nihil, pariatur obcaecati dolorum ex aspernatur illum, unde eveniet non sed laborum placeat soluta similique voluptas fuga id modi consequatur. Nisi maxime, doloribus sit ducimus nulla nostrum quos, perspiciatis voluptates dignissimos obcaecati, a quibusdam! Et in eos provident quis aliquid laudantium illum. At repellendus vitae quidem iusto magnam omnis a accusantium distinctio dolorem maiores id aperiam tempore saepe magni ipsam ex enim recusandae doloremque itaque, quo ullam culpa! Ullam repellendus quos quis neque minima quibusdam optio illo asperiores ex? Hic veritatis excepturi fugit, itaque molestiae dolore in eveniet, tenetur impedit nobis pariatur veniam voluptatem est asperiores non numquam doloribus tempora ipsam doloremque nostrum ut! Quia consectetur eos, provident facilis unde reprehenderit, illo non architecto rem pariatur assumenda dolore distinctio similique fugiat magnam. Rerum at placeat quas, magni similique inventore harum? Nesciunt eius fuga esse, ullam possimus, similique quas officia eligendi nisi dolorum quidem molestiae commodi ipsum! At maiores saepe est rem ullam excepturi quidem, ipsa, quis, amet laudantium molestias provident dicta nulla aut? Explicabo nobis, nulla, sunt repellendus, ab distinctio eligendi consequuntur quisquam eos molestiae debitis placeat aperiam mollitia totam ipsa dolore. Soluta quam deleniti libero voluptatem dolor dignissimos sequi asperiores commodi fugit repellat, laboriosam saepe laudantium ipsum. Nulla molestias ipsam nisi, quis eius praesentium rerum? Fugiat, similique voluptatum animi officiis corrupti enim itaque vitae maxime quis, explicabo iure totam delectus autem dolores? Ipsum sunt ad inventore pariatur sed quaerat ipsa fugiat, recusandae, ipsam alias corporis, labore quo cumque aspernatur eligendi laborum reprehenderit repellat nulla et consequatur eveniet? Facere doloremque possimus numquam iste eius, natus ullam quae accusantium modi error magni laborum! Voluptates, voluptate? Sunt, ea alias. Dolor repellendus ipsam impedit temporibus distinctio laborum culpa atque dolorum vitae. Aperiam odit ullam error magnam doloribus, hic odio cum, repudiandae laudantium voluptates at unde, recusandae aliquid earum quaerat. Quasi veniam saepe officiis aspernatur beatae quibusdam doloribus libero exercitationem nobis sint possimus nihil optio odit, ullam reprehenderit dolor explicabo, recusandae debitis voluptatibus cum excepturi. Aliquid nam eaque laborum odio dignissimos quisquam natus. Ea repellendus quas cupiditate sed quam consequatur unde similique possimus vel nam quod repudiandae voluptate fugiat a dignissimos, nisi, saepe ab, ad repellat quo! Minus dolores quisquam maxime tempore quidem voluptate eius quis veniam aperiam officia doloremque odio et nam non sunt, voluptatem blanditiis numquam, voluptatibus vero! Tempore sit quia officia a, impedit ullam? Voluptas quae consequuntur cum reiciendis odio quod porro iure saepe nulla, aliquam quas fugit provident labore molestiae veritatis incidunt autem temporibus perspiciatis in quisquam natus quos. Laborum illum, numquam enim odio ea perferendis reprehenderit mollitia tempora dolorem quas quae? Dolor itaque vel similique assumenda totam iste? Laudantium quas tempora eligendi ratione unde reprehenderit sapiente mollitia ipsum provident in numquam dolor libero consectetur praesentium quasi perferendis rem blanditiis excepturi, est quia facilis! Tenetur omnis fuga commodi molestias modi asperiores nesciunt recusandae nam tempore quisquam voluptatem consequatur, esse nisi quasi ut iste? Incidunt nobis quam numquam quos, laudantium corrupti non labore, recusandae iure nulla consequuntur a, deleniti quasi voluptates ea? Odit similique commodi error dolorum laborum obcaecati non nulla quo tempore, aperiam consequuntur, est natus delectus? Illo, corporis dicta repudiandae adipisci nesciunt recusandae sint a asperiores nemo soluta esse impedit aut doloremque laboriosam fugit praesentium omnis fuga iure quam voluptate eligendi quos animi libero! Molestias ea explicabo, minima dolorum est excepturi ratione quae debitis minus similique vero neque! Voluptates iste, tempore earum quisquam odit dicta nobis blanditiis cum. Perspiciatis nemo facilis explicabo ex saepe dicta quaerat quas temporibus, itaque eum nisi unde adipisci nobis corporis dolorem eius quidem blanditiis voluptatibus consectetur tempore illo laudantium natus doloribus maxime. Dolorum mollitia libero aliquam voluptatem pariatur laudantium labore exercitationem, reprehenderit dolore temporibus! Delectus culpa consectetur fugiat tenetur blanditiis vel libero dolore, at sequi sit dicta repellendus laboriosam incidunt? Velit distinctio quaerat voluptates vel ipsa neque modi facilis ratione? Id, dicta? Pariatur corporis ab ullam magnam voluptatibus et eos quibusdam dolores odit, cupiditate vero maxime quis tempore omnis totam corrupti modi, perferendis esse asperiores deleniti. Fugiat adipisci ipsum illo ea sint accusamus tenetur quasi, maiores cupiditate repellat voluptate inventore. Magni ipsam mollitia, dolorum ab natus ut, doloribus sed possimus id quaerat similique eligendi corporis adipisci fugit? Ipsa, numquam. Officia tenetur praesentium ipsum beatae sapiente id ea dignissimos, impedit quasi aspernatur odit sequi accusamus illum deserunt, autem dolor laboriosam reprehenderit! Maiores, aperiam nihil hic inventore odit fugit placeat eligendi adipisci, laboriosam commodi libero a reprehenderit voluptas perspiciatis cumque eum numquam nesciunt non. Assumenda error nisi, excepturi ut perferendis delectus et labore, id exercitationem quod quia ea! Itaque laudantium est nihil ad aperiam facere iusto minima, rem vitae expedita, quasi exercitationem, neque illo eaque laboriosam nobis quaerat ratione! Commodi, eaque. Quidem, sunt nobis! Voluptatibus, soluta nam, suscipit praesentium architecto et assumenda consequuntur aut repellat recusandae odio, asperiores quaerat cumque. Quae, sint. Eveniet minus quibusdam dolorem modi similique quo consectetur dignissimos a praesentium labore. Suscipit repellat modi voluptatem neque excepturi soluta cupiditate eaque, doloribus impedit consequatur vitae incidunt non recusandae magni! Placeat culpa in repellat fugit doloremque animi sint ut inventore debitis ducimus assumenda quidem veritatis nostrum odio porro, molestiae facilis corrupti error dolorum dolores magnam beatae sit nemo! Eos nostrum sequi ea voluptatem culpa praesentium voluptatibus, repudiandae quo dolorum soluta. Placeat quae aut perferendis consequatur, provident cumque incidunt dolore laborum asperiores. Voluptatibus mollitia reprehenderit maiores, ea sit harum reiciendis. Distinctio illum quasi quos, obcaecati ullam at. Voluptates itaque ducimus soluta. Dolorem laudantium culpa consequuntur corporis praesentium optio possimus numquam, accusamus nulla incidunt dicta earum saepe? Harum aspernatur earum, doloribus, eveniet iusto itaque accusantium sed in et impedit aliquam odio officia distinctio, fuga non ea repellendus eum ipsa nobis. Totam, alias unde reprehenderit ad eveniet laudantium possimus commodi neque quibusdam debitis hic, consequuntur earum nam autem facilis repudiandae sit ipsam? Atque sed aspernatur amet quisquam facilis id reiciendis, odio debitis molestias minima aut. Voluptatum id dolore laboriosam? Reprehenderit a, dicta fugit ipsa neque sint iure earum exercitationem nisi accusantium odit sit ullam deserunt qui quam error, minima omnis maiores quibusdam, labore debitis necessitatibus aliquid harum. Laboriosam suscipit repellat, saepe inventore nihil optio deleniti magni, itaque exercitationem doloremque nulla fugi',
    }
  },
  components: {
  },
  methods: {
  },
  props: {
  },
  mounted() {    
  },
  computed: {
  }
}
</script>

<style scoped>
  .church-info-container {
    position: relative;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  } 
  .church-info {
    grid-column: 2/3;
  }
  .edit-button {
    width: 25px;
    height: 25px;
    padding: 7.5px;
    position: fixed;
    top: 60px;
    right: 15px;
    background: #4E8F13;
    border-radius: 50px;
    cursor: pointer;
  }
  .edit-button i {    
    color: white;
  }

  input:focus, textarea:focus {
    outline: none;
  }
  input, textarea {
    padding-left: 20px;    
    width: calc(100% - 30px);
    margin-bottom: 10px;
  }

  input.main {
    height: 40px;
    font-size: 20px;
  }
  textarea.main {    
    height: 250px;
    resize: unset;
    margin-top: 10px;
  }
  label {
    font-size: 14px;
    padding-left: 5px;
  }

  
/* //////////////////////////
//////  MEDIA QUERIES ///////
////////////////////////// */

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - desktop (default grid)
   1024-768    - tablet landscape
   768-480     - tablet 
   480-less    - phone landscape & smaller
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
 }

@media all and (min-width: 768px) and (max-width: 1024px) {
 }

@media all and (min-width: 480px) and (max-width: 768px) {
  .church-info-container{
    display: block;
  }
 }

@media all and (max-width: 480px) {
  .church-info-container{
    display: block;
  }
 }
</style>