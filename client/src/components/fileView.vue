
<template>
    <button @click="goBack">Back</button>
    <DataTable :value="files" tableStyle="min-width: 50rem">
    <Column header="Name">
    <template #body="slotProps" class="fileIcon">
        <span class="pi pi-file"></span>
        <a @click="selectedFile(slotProps.data.EventID)" style="margin-left: 2px;">{{slotProps.data.filename}}</a>
    </template>
    </Column>
    <Column field="suffix" header="Type"></Column>    
    <Column header="Read Only">
        <template #body="slotProps">
        <input type="checkbox" :checked="slotProps.data.readOnly" disabled>
        </template>    
    </Column>
    <Column header="Deletable">
    <template #body="slotProps">
        <input type="checkbox" :checked="slotProps.data.deletable" disabled>
    </template>  
    </Column>    
    <Column field="date" header="Date"></Column>        
    </DataTable>
</template>
  
  <script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import ColumnGroup from 'primevue/columngroup';   // optional
  import Row from 'primevue/row';                   // optional
  import 'primeicons/primeicons.css';
  
  export default {
    name: 'FileView',
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row
  },
    props: {
        files: {
        type: Array,
        required: true
        }
    },
    methods: {
        goBack(){
            this.$emit('go-back');
        },
        selectedFile(filename){
            this.$emit('selected-file', filename);
        }
    }
}
  </script>

<style>
input[type="checkbox"] {
    cursor: not-allowed;
}
.fileIcon {
    display: flex;
    align-items: center;
}

a {
    color: black;
    font-weight: bold;
}
</style>