Vue.component( 'contactLine', {
	template : '<li><button v-on:click="removeContact( id )">X</button> {{ name }} {{ phoneNumber }}</li>',

	props : [ 'id', 'name', 'phoneNumber', 'removeContact' ]
});


var contactList = new Vue( {

	el : '#contactList',

	data : {
		attemptingSave : false,

		newName : '',
		newPhone : '',
		newEmail : '',

		nextId : 1,
		contactList : [], 
		
		nextIdSeeds : 5,
		contactSeeds : [ 
			{
				id : 1,
				name : 'Albus Dumbledore',
				phone : '859-123-4567',
				email : 'headmaster@hogwarts.edu'
			},
			{
				id : 2,
				name : 'Minerva McGonagall',
				phone : '606-234-9876',
				email : 'quiddich.is.best.g@hogwarts.edu'
			},
			{
				id : 3,
				name : 'Severus Snape',
				phone : '502-444-1010',
				email : 'potions.maybe.dark.arts@hogwarts.edu'
			},
		], // Seed data
		
	},

	computed : { // Computed fields
		contacts : computedContacts,
		missingName : missingName,
		badPhone : badPhone,
		badEmail : badEmail
	},

	beforeMount : beforeMount,

	methods : {
		alphabetizeContacts : alphabetizeContacts,
		addContact : addContact,
		removeContact : removeContact,
		findContact : findContact,
		validateForm : validateForm,
		loadContacts : loadContacts,
		saveContacts : saveContacts
	},

});

// Computed fields
function computedContacts() {
	return this.contactList.sort( this.alphabetizeContacts );
}

function missingName() {
	return this.newName === '';
}

function badEmail() {
	// return ( this.newEmail.indexOf( '@' ) !== 0 );

	var pattern = /@/;
	return ! pattern.test( this.newEmail );
}

function badPhone() {
	var pattern = /^[1-9]\d{2}-\d{3}-\d{4}$/;
	return ! pattern.test( this.newPhone );
}

// Before Mount method
function beforeMount() {
	this.loadContacts();
}

// Methods
function alphabetizeContacts( a, b ) {
	var aName = a.name.toLowerCase();
	var bName = b.name.toLowerCase();

	if ( aName < bName ) {
		return -1;
	}
	else if ( aName > bName ) {
		return 1;
	}
	else {
		return 0;
	}
}

function addContact( event ) {
	console.log( 'addContact' );
	// console.log( 'addContact::this.missingName: ', this.missingName );
	// console.log( 'addContact::this.badPhone: ', this.badPhone );
	// console.log( 'addContact::this.badEmail: ', this.badEmail );

	if ( ! this.missingName && ! this.badPhone && ! this.badEmail ) {
		console.log( 'addContact::Data is good, create contact' );
		this.contactList.push({
			id : this.nextId++,
			name : this.newName,
			phone : this.newPhone,
			email : this.newEmail
		});

		this.newName = '';
		this.newPhone = '';
		this.newEmail = '';
		this.attemptingSave = false;

		this.saveContacts();
	}
	else {
		console.log( 'addContact::Data is bad, do not create contact' );
	}
}

function removeContact( id ) {
	var contactIndex = this.findContact( id );
	this.contacts.splice( contactIndex, 1 );

	this.saveContacts();
}

function findContact( id ) {
	return this.contacts.findIndex( 
		function( contact ) { 
			return ( id === contact.id ); 
		} 
	);
}

function validateForm( event ) {
	console.log( 'validateForm' );
	console.log( 'validateForm::event: ', event );
	this.attemptingSave = true;

	if ( this.missingName || this.badPhone || this.badEmail ) {
		console.log( 'validateForm::data is bad, preventdefault' );
		event.preventDefault();
	}
	else {
		console.log( 'validateForm::data is good, add contact`' );
		this.addContact( event );
	}
}

function loadContacts() {
	console.log( 'loadContacts' );

	this.mextId = localStorage.getItem( 'nextId' );
	this.contactList = JSON.parse( localStorage.getItem( 'contactList' ) );

	if ( this.contactList === null ) {
		this.mextId = this.nextIdSeed;
		this.contactList = this.contactSeeds;
	}
}

function saveContacts() {
	console.log( 'saveContacts' );

	localStorage.setItem( 'contactList', JSON.stringify( this.contactList ) );
	localStorage.setItem( 'nextId', this.nextId );

}