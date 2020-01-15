<template>
  <div id="giving-person-summary" class="giving-panel panel bold">
  <b-row>
      <b-col sm="8">
        <avatar :height="50" :url="person.personImageThumbnailURL" :title="person.personName" />
        Michael Harrison
      </b-col>
      <b-col sm="4" class="right">
        <span class="">Manual Entry</span>
      </b-col>
    </b-row>
  </div>
</template>