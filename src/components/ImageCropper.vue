<template lang="pug">
input(@change="setImage" type="file" name="image" accept="image/*")
.crop-modal-wrapper(v-if="imgSrc !== ''")
  .croppwer-container
    vue-cropper(
      ref="cropper"
      :guides="true"
      :view-mode="1"
      :auto-crop-area="1"
      :min-container-width="600"
      :min-container-height="600"
      :background="false"
      :rotatable="false"
      :src="imgSrc"
      :img-style="{ 'width': '300px', 'height': '600px' }"
      :aspect-ratio="targetWidth / targetHeight"
      drag-mode="crop"
    )
    button(@click="cropImage" v-if="imgSrc !== ''") トリミングを反映する
</template>
<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      targetWidth: 1,
      targetHeight: 2,
      imgSrc: '',
      cropImg: '',
      filename: ''
    }
  },
  methods: {
   setImage (e) {
     const file = e.target.files[0]
     this.filename = file.name
     if (!file.type.includes('image/')) {
       alert('Please select an image file')
       return
     }
     if (typeof FileReader === 'function') {
       const reader = new FileReader()
       reader.onload = (event) => {
         this.imgSrc = event.target.result
       }
       reader.readAsDataURL(file)
     } else {
       alert('Sorry, FileReader API not supported')
     }
   },
   cropImage () {
     this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
     this.$store.commit("immageUpload", this.cropImg);
     this.imgSrc = ''
   }
 }
}
</script>
