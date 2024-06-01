<template>
    <!-- <div class="folder-container">
        <div class="folder-preview" v-for="folder in folders" :key="folder._foldername">
            <span class="pi pi-folder"></span>
            <div class="folder-name">{{ folder._foldername }}</div>
            <div class="folder-size">{{ folder.files.length }} files</div>
        </div>
    </div> -->
    <DataTable :value="folders" tableStyle="min-width: 50rem">
    <Column header="Name">
      <template #body="slotProps">
        <span class="pi pi-folder"></span>  
        <a style="color: black; font-weight: bold; margin-left: 2px;" @click="">{{ slotProps.data._foldername }}</a>
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
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import 'primeicons/primeicons.css';
import axios from 'axios';

export default {
    name: 'FileTable',
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row
  },
  data() {
    return {
      folders: [],
      testAccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoiMTIzNDU2QGdtYWlsLmNvbSIsImlkIjoiNjY1YWY4NzI1ODBiMjY1OWE0OWFjYWY4IiwidXNlclR5cGUiOiJ1c2VyIn0sImlhdCI6MTcxNzI0NjUxOX0.PZtUmMFknjP9i-b2pNyQtTd3cE4dHw7ftYAsApSdaV8"
    };
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    getFiles() {
      axios.get('http://localhost:3115/api/files/dashboard', {
        headers: {
          Authorization: `Bearer ${this.testAccessToken}`,
        },
        }).then((res) => {
            const response = res.data[0];
            const folders = response.dir;
            this.folders = folders;
            console.log(folders);
        }).catch((err) => {
            console.log(err);
        });
    },
    },
}
</script>

<style>
.folder-container{
    /* grid */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
    padding: 20px; 
}

.folder-preview{
    /* card */
    background-color: #3a3a3a;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.folder-preview .pi-folder{
    font-size: 2rem;
    color: #f0f0f0;
}

.folder-name{
    font-size: 1.5rem;
    color: #f0f0f0;
    margin-top: 10px;
}

.folder-size{
    font-size: 1rem;
    color: #f0f0f0;
    margin-top: 5px;
}


</style>