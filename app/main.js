Vue.component( 'contactLine', {
	template : '<li><button v-on:click="removeContact( id )">X</button> {{ name }} {{ phoneNumber }}</li>',

	props : [ 'id', 'name', 'phoneNumber', 'removeContact' ]
});


var contactList = new Vue( {

	el : '#contactList',

	data : {
		newName : '',
		newPhoneNumber : '',
		contacts : [
			{
				id : 1,
				name : 'Albus Dumbledore',
				phoneNumber : '859-123-4567'
			},
			{
				id : 2,
				name : 'Minerva McGonagall',
				phoneNumber : '606-234-9876'
			},
			{
				id : 3,
				name : 'Severus Snape',
				phoneNumber : '502-444-1010'
			},
		],
		nextContactId : 4
	},

	methods : {
		addContact : addContact,
		removeContact : removeContact,
		findContact : findContact,
		validatePhoneNumber : validatePhoneNumber
	}

});

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