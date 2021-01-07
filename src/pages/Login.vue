<template>
    <div>
       <div class="login-bg"></div>
        <div class="login-wrapper">
            <div class="login-outer">
                
                <h4>Login</h4>
                <form>
                    <div class="form-group mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Country</label>
                    <input type="text" class="form-control" v-model="country" id="country" placeholder="Country"/>
                    </div>
                    <div class="form-group mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                    <input type="text" class="form-control" v-model="email" id="exampleFormControlInput1" placeholder="Enter Username"/>
                    </div>
                    <div class="form-group mb-3">
                    <label for="exampleFormControlInput2" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" id="exampleFormControlInput2" placeholder="Password"/>
                    </div>
                    
                    <div>
                        <button type="submit" @click="handleSubmit" class="btn btn-blue mt-2">Submit</button>
                    </div>
                </form>
                </div>
            </div>
    </div>
</template>

<script>
import { delDbJsStore } from "../service/idb_service";
    export default {
        data(){
            return {
                API_URL: this.$store.state.API_URL,
                country: "",
                email : "",
                password : ""
            }
        },
        async beforeCreate() {
            if (localStorage.getItem('jwt') != null){
                this.$emit('loggedIn')
                if(this.$route.params.nextUrl != null){
                    this.$router.push(this.$route.params.nextUrl)
                }
                else {
                    
                    this.$router.push('home')
                    
                }
                this.$router.push('home')
            }
        },
        methods : {
            handleSubmit(e){
                this.changeSpinnerStatus(true)
                e.preventDefault()
                if (localStorage.getItem("country") != null) {
                    const country = localStorage.getItem("country")
                    if(country != this.country){
                     delDbJsStore();
                    }
                }
                if (this.password.length > 0) {
                    const url = `${this.API_URL}/user/check`
                    this.$http.post(url, {
                        country: this.country,
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        //console.log(response);
                        if(response.data.status == 200){
                            localStorage.setItem('user',JSON.stringify(response.data.data))
                            localStorage.setItem('jwt',response.data.token)
                            localStorage.setItem('country', this.country)
                            if (localStorage.getItem('jwt') != null){
                                this.$emit('loggedIn')
                                if(this.$route.params.nextUrl != null){
                                    this.$router.push(this.$route.params.nextUrl)
                                }
                                else {
                                    this.setCountry(this.country)
                                    this.$router.push('home')
                                    
                                }
                                this.setCountry(this.country)
                                this.$notify({ group: 'app', text: response.data.message })
                                this.changeSpinnerStatus()
                            }
                        } else {
                           this.$notify({ group: 'login',type: 'warn', title: 'Error!', text: response.data.message })
                           this.changeSpinnerStatus()
                        }
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    

                } else {
                    this.$notify({ group: 'login',type: 'warn', title: 'Error!', text: 'Please Enter Password' })
                    this.changeSpinnerStatus()
                }
            },
            changeSpinnerStatus(status = false) {
            this.$store.dispatch('changeSpinnerStatus', status)
            },
            setCountry(country) {
            this.$store.dispatch('setCountry', country)
            },
          
        }
    }
</script>
<style scoped>
.login-bg{
	background:url('https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png') no-repeat center;
	background-attachment:fixed;
	position:fixed;
	left:0px;
	top:0px;
	bottom:0px;
	right:0px;
	opacity:0.1;
	z-index:-1;
}
.login-outer{
	width: 400px;
	height: auto;
	margin: auto;
	background: #ffffff;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	position: relative;
	padding: 40px;
	box-shadow: 0px 0px 30px #f5f5f5;
}
.login-wrapper{
	position:fixed;
	left:0px;
	top:0px;
	right:0px;
	bottom:0px;
	display:flex;
	align-items:center;
}
.login-outer h4{
	color:blue;
	font-size:22px;
	margin-bottom:20px;
	display:block;
}
.login-outer form{
	width:100%;
}

@media only screen and (max-width:767px){
.login-outer{
		width:100%;	
		max-width: 90%;
		margin: 50px 5% 0px;
		left: inherit;
		position: inherit;
	}
}
</style>
