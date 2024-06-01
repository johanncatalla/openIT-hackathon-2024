<template>
    <div class="buttonview">
        <Toast />
        <FileUpload class="file-upload-button" mode="basic" name="demo[]" :url="uploadUrl" accept=".txt,.xml,.json" :maxFileSize="100000000" @upload="onUpload" :auto="true" chooseLabel="Upload File" :disabled="!selectedFolder"/>   
        <ButtonClick label="Add folder" class="button" @click="onAddFolder" />
    </div>
    <div class="table-viewer">
        <folderView :folders="folders" @view-folder-content="viewFolderContent" @selected-folder="setSelectedFolder" v-if="!isViewFile" />
        <fileView :files="files" @go-back="backFolderView" @selected-file="viewFile" v-else/>
    </div>
    <div class="file-content" v-if="selectedFileContent">
        <div>
            <h1 id="filename">{{ "".concat(selectedFileContent.filename, selectedFileContent.suffix) }}</h1>
            <textarea :readonly="selectedFileContent.readOnly" v-model="selectedFileContent.Message"></textarea>
        </div>
    </div>
</template>

<script>
import folderView from '@/components/folderView.vue';
import fileView from '@/components/fileView.vue';
import FileUpload from 'primevue/fileupload';
import axios from 'axios';

export default {
    name: 'TableViewer',
    components: {
        folderView,
        fileView
    },
    props: {
        AccessToken: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            folders: [],
            isViewFile: false
            ,files: []
            ,selectedFile: ''
            ,selectedFileContent: ''
            ,selectedFolder: ''
            ,fileMessage: ''
        };
    },
    computed: {
        uploadUrl() {
            return `http://localhost:3115/api/files/dashboard/folder/${this.selectedFolder}`;
        }
    },
    mounted() {
        this.getFolders();
    },
    methods: {
        getFolders() {
            axios.get('http://localhost:3115/api/files/dashboard', {
                headers: {
                    Authorization: `Bearer ${this.AccessToken}`,
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
                    Authorization: `Bearer ${this.AccessToken}`,
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
            console.log(foldername);
        },
        onUpload() {
            axios.post(``, {
                
            }, {
                headers: {
                    Authorization: `Bearer ${this.AccessToken}`,
                },
            }).then((res) => {
                console.log(res);
                this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            }).catch((err) => {
                console.log(err);
            });
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        onAddFolder() {
            axios.post('http://localhost:3115/api/files/dashboard', {
            _foldername: "New Folder 101"
            }, {
            headers: {
                Authorization: `Bearer ${this.AccessToken}`,
            },
            }).then((res) => {
            console.log(res);
            this.getFolders();
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Added Folder', life: 3000 });
            }).catch((err) => {
            console.log(err);
            });
        }
    }
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

#filename{
    color: black;
    margin-top: 10px;
}

.buttonview{
    display: flex;
    justify-content: left;
    margin-bottom: 10px;
}

.file-upload-button{
    margin-bottom: 10px;
}
.button {
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: lightcoral;
}
.p-button{
    padding: 10px 20px;

}

.p-button svg{
    margin-right: 10px;
}

</style>