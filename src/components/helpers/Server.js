import axios from "axios";
var api_url = "https://ricocorrespondentes.com/tempt/index.php/api/";
export default{
	checkPass: function(pass, cpass, token){
        var r = axios.post(api_url+'checkpassword', {password: pass, cpassword: cpass, access_token: token})
        .then((res) => {
        	if(res.data.result) return res.data.result;
        	else{
        		res.data.errors.forEach((error => {
	        		M.toast({html: error, classes: 'red'});
	        	}));
	        	return false
        	}
        });
        return r;
	},
    preloadFile: function(e){
      let f = e.target.files || e.dataTransfer.files;
      if(!f.length) return;
      let reader = new FileReader();
      reader.onload = (e) => {
        this.file = e.target.result;
      };
      reader.readAsDataURL(f[0]);
    },
	get: function(endpoint, data){
		var c = axios.post(api_url+endpoint, data)
		.then((res) => {
			return res.data;
		});
		return c;
	},
	send: function(endpoint, data, success="Sucesso!", update=false){
	    axios.post(api_url+endpoint, data)
	    .then((res) => {
	        if(res.data.result) M.toast(
	        	{
	        		html: success,
	        		classes: 'green',
	        		completeCallback: () => {if(update)location.reload()}
	        	}
	        );
	        else res.data.errors.forEach((error => {
	        	M.toast({html: error, classes: 'red'});
	        }));
	    })
	    .catch((err) => {
	    	console.error(err);
	    });
	},
	data(){
		return {
			file: null
		}
	}
}
