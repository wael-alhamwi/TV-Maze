var validate = require('validator');

module.exports = function(app) {
	//Anand Suresh was responsible for the userinfo page 
	app.post('/userinfoPost', function(req, res){
		var date = new Date();
		var year = date.getFullYear();
		var refDate = new Date((date.getFullYear()-18), date.getMonth(), date.getDate());

		if(!validate.isAlpha(req.body.fname)) {
			res.send('Not correct first name');
			return;
		}
		if(!validate.isAlpha(req.body.lname)) {
			res.send('Not correct last name');
			return;
		}
		if(!validate.isURL(req.body.url)) {
			res.send("not correct url");
			return;
		}
		if(validate.isAfter(req.body.bday, refDate)) {
			res.send("you should be above 18 to proceed");
			return;
		}
		if(!validate.contains(req.body.fb,'facebook')) {
			res.send("please enter your facebook url");
			return;
		}
		else {
			res.redirect('/register');
		}
	});
	//Weicheng Chen was responsible for the register page
	app.post('/registerPost', function(req,res){
		var errs = {};
		var pass = true;
		if(!validate.isAlphanumeric(req.body.username)||
		!validate.isLength(req.body.username, 5, 12)||
		validate.isInt(req.body.username)){
			errs['username'] = false;
			pass = false;
		}
		if(!validate.isLength(req.body.password, 8)||
		!(validate.matches(req.body.password, /[a-z]/)
		&&(validate.matches(req.body.password, /[A-Z]/))
		&&(validate.matches(req.body.password, /\d/))
		&&(validate.matches(req.body.password, /[!@#$%^&*-?]/)))){
			errs['password'] = false;
			pass = false;
		}
		if(!validate.equals(req.body.password, req.body.repassword)){
			errs['repassword'] = false;
			pass = false;
		}
		if(pass){
			res.redirect('/contact');
		}else{
			res.json(errs);
		}

	});
	//Sridhar Shivamalavaiah was responsible for the contact page
	app.post('/contactPost', function(req,res){
		var sanitizeEmail = validate.normalizeEmail(req.body.email);

		console.log("Sanitized Email: "+sanitizeEmail);
		if(!validate.isEmail(sanitizeEmail)){
			res.send("Invalid email");
			return;
		}
		if(!validate.isMobilePhone(req.body.mobile,'en-US')){
			res.send("Invalid mobile");
			return;
		}
		if(!validate.isAlpha(req.body.state)){
			res.send("Invalid state");
			return;
		}
		if(!validate.isNumeric(req.body.zipcode)){
			res.send("Invalid zipcode");
			return;
		}
		if(!validate.isLength(req.body.zipcode,5,5)){
			res.send("Invalid zipcode length");
			return;
		}

		res.redirect('/payment');




	});
	//Wael Alhamwi was responsible for the payment page
	app.post('/paymentPost', function(req,res){

		var chn = req.body.cardHolderName;
		var cno = req.body.cardNumber;
		var cvv = req.body.cvv;
		var exm = req.body.expiryMonth;
		var exy = req.body.expiryYear;

		var date = new Date();

		if(!validate.isAlpha(chn)){
			res.send("Invalid Credit card name");
			return;
		}

		if(!validate.isCreditCard(cno)){
			res.send("Invalid Credit No.");
			return;
		}

		if(!validate.isInt(cvv, {min: 0, max: 9999})){
			res.send("Invalid CVV");
			return;
		}

		if(!validate.isInt(exm,{min: 1, max: 12})){
			res.send("Invalid Month");
			return;
		}

		if(!validate.isInt(exy)){
			res.send("Invalid Year");
			return;
		}
		if(validate.isBefore(new Date(exy, exm), date)){
			res.send("Card is expired");
			return;
		}

		res.redirect('/last');

	});
}
