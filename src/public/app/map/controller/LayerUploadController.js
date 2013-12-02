Ext.define('Savanna.map.controller.LayerUploadController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        fileDropZone: true,
        chooseFileButton: {
            click: 'chooseFile'
        },
        fileBrowserButton: {
            change: 'onFileChange'
        }
    },

    file: null,

    chooseFile: function() {
        // Click the file browser button.
        var dom = this.getFileBrowserButton().getEl().dom;
        var input = Ext.dom.Query.selectNode("[type='file']", dom);
        input.click();
    },

    onFileChange: function(fileButton, e) {
        // Reset the field.
        fileButton.reset();

        // Capture the file from the window.
        this.file = e.target.files[0];

        // Create the task on geoserver.
        Ext.Ajax.request({
            url: '/geoserver/rest/imports',
            method: 'POST',
            success: this.onTaskCreated,
            scope: this
        });
    },

    onTaskCreated: function(response) {
        // Capture the url to the created task.
        var responseText = Ext.decode(response.responseText);
        var url = responseText.import.href + '/tasks';

        // Create the form data to submit.
        var formData = new FormData();
        formData.append(this.file.name, this.file);

        // Send the form data.
        // TODO: Handle invalid file types.
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = Ext.bind(this.onUploadSuccess, this, [url]);
        xhr.send(formData);
    },

    onUploadSuccess: function(url) {
        // Request the expanded JSON.
        Ext.Ajax.request({
            method: 'GET',
            url: url + '?expand=all',
            success: this.onExpandSuccess,
            scope: this
        });
    },

    onExpandSuccess: function(response) {
        // Capture the expanded tasks.
        var responseText = Ext.decode(response.responseText);
        var tasks = responseText.tasks;

        this.getView().fireEvent('uploadcomplete', this, tasks);
        this.getView().close();
    }
});