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

		contactList : [ 
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
		], // Stored data, unsorted
		
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
		removeContact : removeContact,
		findContact : findContact,
		validateForm : validateForm

		/*
		addContact : addContact,
		
		validatePhoneNumber : validatePhoneNumber
		*/
	},

});

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

function beforeMount() {

}

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

function removeContact( id ) {
	var contactIndex = this.findContact( id );
	this.contacts.splice( contactIndex, 1 );
}

function findContact( id ) {
	return this.contacts.findIndex( 
		function( contact ) { 
			return ( id === contact.id ); 
		} 
	);
}

function validateForm() {
	this.attemptingSave = true;
}



/*
function validatePhoneNumber() {
	var phoneRe = /^[0-9\-\+\s\(\)]*$/;

	var isValid = phoneRe.test( this.newPhoneNumber );

	console.log( 'validatePhoneNumber-isalid:', isValid );

	return isValid;
}

function addContact() {
	if ( ! this.validatePhoneNumber( this.newPhoneNumber ) ) {
		return;
	}
	else {
		this.contacts.push(
			{
				id : this.nextContactId++,
				name : this.newName,
				phoneNumber : this.newPhoneNumber
			}
		);

		this.newName = '';
		this.newPhoneNumber = '';
	}

	
}

function removeContact( id ) {
	var contactIndex = this.findContact( id );
	this.contacts.splice( contactIndex, 1 );
}

function findContact( id ) {
	return this.contacts.findIndex( 
		function( contact ) { 
			return ( id === contact.id ); 
		} 
	);
}
*/