<template>
    <div>
        <folderView :folders="folders" @view-folder-content="viewFolderContent" @selected-folder="setSelectedFolder" v-if="!isViewFile" />
        <fileView :files="files" @go-back="backFolderView" @selected-file="viewFile" v-else/>
    </div>
    <div class="file-content">
        <div>
            <h1>{{ selectedFileContent.filename }}</h1>
            <textarea :readonly="selectedFileContent.readOnly" v-model="selectedFileContent.Message"></textarea>
        </div>
    </div>
</template>

<script>
import folderView from '@/components/folderView.vue';
import fileView from '@/components/fileView.vue';
import axios from 'axios';

export default {
    name: 'Test',
    components: {
        folderView,
        fileView
    },
    data() {
        return {
            folders: [],
            testAccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoiMTIzNDU2QGdtYWlsLmNvbSIsImlkIjoiNjY1YWY4NzI1ODBiMjY1OWE0OWFjYWY4IiwidXNlclR5cGUiOiJ1c2VyIn0sImlhdCI6MTcxNzI0NjUxOX0.PZtUmMFknjP9i-b2pNyQtTd3cE4dHw7ftYAsApSdaV8"
            ,isViewFile: false
            ,files: []
            ,selectedFile: ''
            ,selectedFileContent: ''
            ,selectedFolder: ''
            ,fileMessage: ''
            ,
        };
    },
    mounted() {
        this.getFolders();
    },
    methods: {
        getFolders() {
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
        viewFolderContent(files) {
            this.files = files;
            console.log(files);
            this.isViewFile = true;
        },
        backFolderView() {
            this.isViewFile = false;
            this.files = [];
            this.selectedFile = '';
            this.selectedFileContent = '';
            this.selectedFolder = '';
        },
        viewFile(file) {
            console.log(file);
            this.selectedFile = file;
            axios.get(`http://localhost:3115/api/files/dashboard/folder/${this.selectedFolder}/${file}`, {
                headers: {
                    Authorization: `Bearer ${this.testAccessToken}`,
                },
            }).then((res) => {
                const response = res.data;
                this.selectedFileContent = response;
                this.fileMessage = response.Message;
                
            }).catch((err) => {
                console.log(err);
            });
        },
        setSelectedFolder(foldername) {
            this.selectedFolder = foldername;
        }
    },
};
</script>
<style>
textarea{
    width: 100%;
    height: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    color: black;
}
</style>