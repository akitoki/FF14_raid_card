<template lang="pug">
.select-wrapper.sp-full-width
  select(v-model="dataCenterSelect")
    option(v-for="dataCenter in dataCenters" :value="dataCenter") {{dataCenter}}
.select-wrapper.sp-full-width(v-if="dataCenterSelect === 'Elemental'")
  select(v-model="worldElemental")
    option(v-for="elemental in elementalDc" :value="elemental") {{elemental}}
.select-wrapper.sp-full-width(v-if="dataCenterSelect === 'Gaia'")
  select(v-model="worldGaia")
    option(v-for="Gaia in gaiaDc" :value="Gaia") {{Gaia}}
.select-wrapper.sp-full-width(v-if="dataCenterSelect === 'Mana'")
  select(v-model="worldMana")
    option(v-for="mana in manaDc" :value="mana") {{mana}}
.select-wrapper.sp-full-width(v-if="dataCenterSelect === 'Meteor'")
  select(v-model="worldMeteor")
    option(v-for="meteor in meteorDc" :value="meteor") {{meteor}}
</template>
<script>
export default {
  name: 'ServerSelect',
  data() {
    return {
      dataCenterSelect: 'Elemental',
      worldElemental: 'Aegis',
      worldGaia: 'Alexander',
      worldMana: 'Anima',
      worldMeteor: 'Belias',
      dataCenters: ['Elemental', 'Gaia', 'Mana', 'Meteor'],
      elementalDc: ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Tonberry', 'Typhon'],
      gaiaDc: ['Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima'],
      manaDc: ['Anima', 'Asura', 'Chocobo', 'Hades', 'Ixion', 'Masamune', 'Pandaemonium', 'Titan'],
      meteorDc: ['Belias', 'Mandragora', 'Ramuh', 'Shinryu', 'Unicorn', 'Valefor', 'Yojimbo', 'Zeromus']
    }
  },
  watch: {
    dataCenterSelect(value) {
      this.$store.commit('dataCenter', value)
    },
    worldElemental(value) {
      this.$store.commit('world', value)
    },
    worldGaia(value) {
      this.$store.commit('world', value)
    },
    worldMana(value) {
      this.$store.commit('world', value)
    },
    worldMeteor(value) {
      this.$store.commit('world', value)
    }
  }
}
</script>
