Ext.define('Savanna.crumbnet.store.Graph', {
    extend: 'Ext.data.Store',

    storeId: 'graphStore',

    model: 'Savanna.crumbnet.model.Graph',

    autoLoad: true,

    constructor: function() {
        this.buildData();

        this.callParent(arguments);
    },

    buildData: function() {
        this.data = [
            {
                id: 'GRAPH_ONE',
                linkDataArray: [],
                nodeDataArray: []
            }
        ];

        var categories = ['Concept', 'Question', 'Problem', 'Fact', 'Hypothesis', 'Conclusion', 'Assumption'];
        var TOT_NODE_COUNT = 50; // NOTE: change this to 1000 and performance will degrade...
        var generatedLink = {};

        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        for (var i = 0; i < TOT_NODE_COUNT; ++i) {
            var type = categories[i % categories.length];

            this.data[0].nodeDataArray.push({ key: i, text: type, type: type, category: 'standard', percent: Math.random() * 100,
            });

            var to = randomInt(0, TOT_NODE_COUNT-1);
            var from = randomInt(0, TOT_NODE_COUNT-1);
            var key = from + '-' + to;

            var linkInt = randomInt(1, 3);
            var type = linkInt == 1 ? 'Orthogonal' : linkInt == 2 ? 'Tapered' : 'Straight';

            if (to !== from && !generatedLink[key]) {
                this.data[0].linkDataArray.push({ from: from > to ? to : from, to: to > from ? to : from, text: key, category: type});
                generatedLink[key] = true;
            }
        }
    }
});