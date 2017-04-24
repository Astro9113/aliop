from django import forms
import aliapi

class RecordFilter(forms.Form):
    username = forms.CharField(label='username',max_length=100,required=False)

# noinspection PyInterpreter
class Login(forms.Form):
    username = forms.CharField(label='username',max_length=100)
    password = forms.CharField(label='password',widget=forms.PasswordInput())

class UserForm(forms.Form):
    username = forms.CharField(label='username',max_length=100)
    password = forms.CharField(label='password',widget=forms.PasswordInput())
    email = forms.CharField(label='email',max_length=100, required=False)
    tel = forms.CharField(label='tel',max_length=100, required=False)

class AppTypeForm(forms.Form):
    apptype = forms.ChoiceField(label="Select your application type:", choices=[("poc","poc"),("wallet","wallet"),("privatenet", "private network")])
class AppDestroyForm(forms.Form):
    prefix = forms.CharField(label='Input the prefix which you want to destroy',max_length=100)

class AppPocForm(forms.Form):
    name = forms.CharField(label='Name', max_length=100)
    desc = forms.CharField(label='Description', max_length=100,required=False)
    webport = forms.CharField(label='Public port', max_length=100)
    def __init__(self,*args, **kwargs):
        super(AppPocForm,self).__init__(*args, **kwargs)
        self.fields["name"].initial = aliapi.generate_free_insname("wlpoc")
        self.fields["webport"].initial = aliapi.generate_free_port(10000,19999)
class AppWalletForm(forms.Form):
    name = forms.CharField(label='Name', max_length=100)
    desc = forms.CharField(label='Description', max_length=100,required=False)
    sshport = forms.CharField(label='SSH Public Port', max_length=100)
    webport = forms.CharField(label='WEB Public port', max_length=100)
    ethport = forms.CharField(label='Ethereum Public RPC port', max_length=100)
    def __init__(self,*args, **kwargs):
        super(AppWalletForm,self).__init__(*args, **kwargs)
        self.fields["name"].initial = aliapi.generate_free_insname("wallet")
        self.fields["sshport"].initial = aliapi.generate_free_port(30000,39999)
        self.fields["webport"].initial = aliapi.generate_free_port(30000,39999)
        self.fields["ethport"].initial = aliapi.generate_free_port(30000,39999)
class AppPrivateNetForm(forms.Form):
    name = forms.CharField(label='Name', max_length=100)
    desc = forms.CharField(label='Description', max_length=100,required=False)
    networkid = forms.CharField(label='Ethereum Network ID', max_length=100)
    sshport = forms.CharField(label='SSH Public Port', max_length=100)
    webport = forms.CharField(label='WEB Public port', max_length=100)
    ethport = forms.CharField(label='Ethereum Public RPC port', max_length=100)
    def __init__(self,*args, **kwargs):
        super(AppPrivateNetForm,self).__init__(*args, **kwargs)
        self.fields["name"].initial = aliapi.generate_free_insname("wlprn")
        self.fields["networkid"].initial = aliapi.generate_networkid()
        self.fields["sshport"].initial = aliapi.generate_free_port(20000,29999)
        self.fields["webport"].initial = aliapi.generate_free_port(20000,29999)
        self.fields["ethport"].initial = aliapi.generate_free_port(20000,29999)
