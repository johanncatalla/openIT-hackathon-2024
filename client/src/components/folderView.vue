<template>
  <DataTable :value="folders" tableStyle="min-width: 50rem" >
    <Column header="Name">
      <template #body="slotProps">
        <span class="pi pi-folder"></span>  
        <a 
          style="color: black; font-weight: bold; margin-left: 2px;" 
          @click="{viewFolderContent(slotProps.data.files); selectedFile(slotProps.data._foldername)}"
        >
          {{ slotProps.data._foldername }}
        </a>
      </template>
    </Column>
    <Column header="Size">
      <template #body="slotProps">
          {{ slotProps.data.files.length }} files
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css';

export default {
  name: 'FileTable',
  components: {
    DataTable,
    Column,
  },
  props: {
    folders: {
      type: Array,
      required: true
    }
  },
  methods: {
    viewFolderContent(files) {
      this.$emit('view-folder-content', files);
    },
    selectedFile(foldername) {
      this.$emit('selected-folder', foldername);
    }
  }
}
</script>

<style>
/* Add any additional styling here if needed */
</style>
