/* global Ext: false, Savanna: false */


 Ext.define('Savanna.modelSearch.store.SearchResults', {
 extend: 'Ext.data.Store',

 requires: [
 'Savanna.modelSearch.model.SearchResult',
 'Savanna.proxy.Cors'
 ],

 storeId: 'searchResults',

 //   model: 'Savanna.modelSearch.model.SearchResult',

 autoLoad: false,

 pageSize: 20,

 facetValueSummaries: [
 {
 key: "type_Acidity",
 label: "Acidity",
 facetType: "string",
 facetMultiselect: true,
 facetValues: [
 {
 value: "Acid",
 count: 234
 },
 {
 value: "Base",
 count: 102
 },
 {
 value: "Neutral",
 count: 10
 }

 ]
 },

 {
 key: "created_dts",
 label: "Created" ,
 facetType: "date",
 facetMultiselect: false,  // how to populate.
 facetValues: [
 {
 label: "Last Day",
 value: "last day",
 startValue: 234234234234,
 count: 43
 },
 {
 label: "Last Month",
 value: "last month",
 startValue: 234234234234,
 count: 400
 }
 ]
 }
 ],


 facetFilterCriteria:[],

 dateTimeRanges:[],





 fields: [
 {name: 'uri', type: 'string'},
 {name: 'label', type: 'string'},
 {name: 'type', type: 'string'},   //possible values: "Item", "Process"
 {name: 'modifiedBy', type: 'string'},
 {name: 'modifiedDate', type: 'string'},
 {name: 'preview', type: 'string'},
 {name: 'primaryImageUrl', type: 'string'},
 {name: 'workflowState', type: 'string'},
 {name: 'classification', type: 'string'}
 ],

 data:    [
 {
 uri: "Nitric%2FProcess",
 label: "Nitric Acid Process",
 type: "Process",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: "blah blah <b>acid</b> we could highlight search terms",  // may not have bold.  may be blank
 primaryImageUrl: "",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 },
 {
 uri: "x012f931fec769ca941e8de4f7a674bec2a290937%2FItem",
 label: "Sulfuric Acid",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Sulfuric acid</b> (<a href="/wiki/Sulfur#Spelling_and_etymology" title="Sulfur">alternative spelling</a> <b>sulphuric acid</b>) is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a> <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with the <a href="/wiki/Molecular_formula" title="Molecular formula" class="mw-redirect">molecular formula</a> <a href="/wiki/Hydrogen" title="Hydrogen">H<sub>2</sub></a><a href="/wiki/Sulfate" title="Sulfate">SO<sub>4</sub></a>. It is a pungent, colorless to slightly yellow viscous liquid which is soluble in <a href="/wiki/Water" title="Water">water</a> at all concentrations.<sup id="cite_ref-ds_4-0" class="reference"><a href="#cite_note-ds-4"><span>[</span>4<span>]</span></a></sup> Sometimes, it is dyed dark brown during production to alert people to its hazards.<sup id="cite_ref-5" class="reference"><a href="#cite_note-5"><span>[</span>5<span>]</span></a></sup> The historical name of this acid is <b>oil of vitriol</b>.<sup id="cite_ref-6" class="reference"><a href="#cite_note-6"><span>[</span>6<span>]</span></a></sup>"',  // may not have bold.  may be blank
 primaryImageUrl: "http://bioland-sci.com/index.php?main_page=product_info&cPath=4_140&products_id=744&zenid=bde1gn7obfd2il99mg26455dk4",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 },
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 } ,
 {
 uri: "uid:sadflkajsdf",
 label: "Hydrochloric Acid (HCl)",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: '<b>Hydrochloric acid</b> is a clear, colorless, highly <a href="/wiki/Pungency" title="Pungency">pungent</a> <a href="/wiki/Solution" title="Solution">solution</a> of <a href="/wiki/Hydrogen_chloride" title="Hydrogen chloride">hydrogen chloride</a> (<a href="/wiki/Hydrogen" title="Hydrogen">H</a><a href="/wiki/Chlorine" title="Chlorine">Cl</a>) in water. It is a highly <a href="/wiki/Corrosive" title="Corrosive" class="mw-redirect">corrosive</a>, <a href="/wiki/Strong_acid" title="Strong acid" class="mw-redirect">strong</a> <a href="/wiki/Mineral_acid" title="Mineral acid">mineral acid</a> with many industrial uses. Hydrochloric acid is found naturally in <a href="/wiki/Gastric_acid" title="Gastric acid">gastric acid</a>.',
 primaryImageUrl: "http://cdn.c.photoshelter.com/img-get/I0000iYGCbLfYh6s/s/860/860/Fphoto-67551208C-6ES.jpg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 }

 ]
 });



/* global Ext: false, Savanna: false */

/*
Ext.define('Savanna.modelSearch.store.SearchResults', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.modelSearch.model.SearchResult',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchResults',

    fields: [
        {name: 'uri', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'type', type: 'string'},   //possible values: "Item", "Process"
        {name: 'modifiedBy', type: 'string'},
        {name: 'modifiedDate', type: 'string'},
        {name: 'preview', type: 'string'},
        {name: 'primaryImageUrl', type: 'string'},
        {name: 'workflowState', type: 'string'},
        {name: 'classification', type: 'string'}
    ],

    autoLoad: false,

    pageSize: 20,

    facetValueSummaries:null,

    facetFilterCriteria:[],

    dateTimeRanges:[],

    searchParamVO: null,


    updateJson: function () {
        //Hallelujah! This lets us change page size and start index
        if (this.searchParamVO) {
            this.searchParamVO.pageStart = (this.currentPage - 1) * this.pageSize;
            this.searchParamVO.pageSize = this.pageSize;
            this.jsonData = Ext.JSON.encode(this.searchParamVO);
        }
        return this.jsonData;
    },

    constructor: function () {

        var ReaderClass,
            me = this;

        this.callParent(arguments);



        ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'results',
            totalProperty:'totalResults',
            readRecords: function(data) {
                me.facetValueSummaries = data.facets;

                //This is the correct usage of this.  Follow IDEA's warning at your own peril:
                return this.callParent([data]);
            }

        });


        this.setProxy({
            type: 'savanna-cors',
            // url: '10.0.3.166:8095/rest/modelSearch/keyword/item' ,
            url: SavannaConfig.modelSearchUrl,
            reader: new ReaderClass(),
            enablePagingParams: false,

            //gaaah.  Undefined used to work.  setEnablePagingParams(false) is supposed to work "soon".
            // null works as of Tuesday Oct. 22, 2013.
            pageParam: null,
            startParam: null,
            limitParam: null,

            modifyRequest:function(request) {

                Ext.apply(request, {
                    jsonData: me.updateJson(),
                    method: 'POST'
                });

                return request;
            }
        });
    }
});
 */

