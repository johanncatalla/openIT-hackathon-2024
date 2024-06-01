<template>
    <Breadcrumb :home="home" :model="this.items" />
    <div class="buttonview">
        <Toast />
        <FileUpload class="file-upload-button" mode="basic" name="demo[]" :url="uploadUrl" accept=".txt,.xml,.json" :maxFileSize="100000000" @upload="onUpload" :auto="true" chooseLabel="Upload File" :disabled="!selectedFolder"/>   
        <ButtonClick label="Add folder" class="button" @click="setAddFolder" :disabled="addFolderVisible"/>
        <FloatLabel class="input" :hidden="!addFolder">
            <InputText type="text" v-model="value" variant="filled" />
            <label for="username">Foldername</label>
        </FloatLabel>
        <ButtonClick label="Add" class="button2" @click="onAddFolder" :hidden="!addFolder"/>

    </div>
    
    <div class="table-viewer">
        <folderView :folders="folders" @view-folder-content="viewFolderContent" @selected-folder="setSelectedFolder" v-if="!isViewFile" />
        <fileView :files="files" @go-back="backFolderView" @selected-file="viewFile" v-else/>
    </div>
    <div class="file-content" v-if="selectedFileContent">
        <div>
            <h1 id="filename">File Content</h1>
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
            value: null,
            folders: [],
            isViewFile: false
            ,files: []
            ,selectedFile: ''
            ,selectedFileContent: ''
            ,selectedFolder: false
            ,fileMessage: '',
            addFolder: false,
            addFolderVisible: false,
            items: [],
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
            this.addFolderVisible = false;
            this.items = [];
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
                this.items[1] = { label: "".concat(response.filename, response.suffix)};
                
            }).catch((err) => {
                console.log(err);
            });
        },
        setSelectedFolder(foldername) {
            this.selectedFolder = foldername;
            this.addFolderVisible = true;
            this.items.push({ label: foldername });
            console.log(foldername);
        },
        onUpload(event) {
            const file = event.files[0];
            const formData = new FormData();
            formData.append('file', file);

            axios.post(`http://localhost:3115/api/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${this.AccessToken}`,
            },
            }).then((res) => {
            console.log(res);
        
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            }).catch((err) => {
            console.log(err);
            });
        },
        onAddFolder() {

            axios.post('http://localhost:3115/api/files/dashboard', {
            _foldername: this.value
            }, {
            headers: {
                Authorization: `Bearer ${this.AccessToken}`,
            },
            }).then((res) => {
            console.log(res);
            this.getFolders();
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Added Folder', life: 3000 });
            this.addFolder = false;
            this.value = '';
            this.setAddFolderVisible = false;
            }).catch((err) => {
            console.log(err);
            });
        },
        setAddFolder() {
            this.addFolder = true;
        },
        setAddFolderVisible() {
            this.addFolderVisible = true;
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

.buttonview .input{
    margin: 0px;
    margin-left: 10px;
    font-family: var(--font-family);
    font-weight: normal;
    background: var(--surface-ground);
    background-color: #f8f8f8;
    border: 1px solid gray;
    border-radius: 5px;
    color: var(--text-color);
    padding: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 45px;
    
}

.file-upload-button{
    margin-bottom: 10px;
}
.button {
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: lightcoral;
}

.button2 {
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: lightgreen;
}

.p-button{
    padding: 10px 20px;

}

.p-button svg{
    margin-right: 10px;
}

.p-breadcrumb{
    margin-bottom: 1rem;
}
</style>