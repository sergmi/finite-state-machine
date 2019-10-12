class FSM {   
    constructor(config) {
		if(!config){
			alert('ERROR');
		}
		else {
			this.initial=config.initial;
			this.states=['normal','busy','hungry','sleeping'];
			this.triggerOne=null;
			this.triggerTwo=null;				
			this.triggerFirst=null;
			this.triggerSecond=null;
		}
	}

     getState() {
		return this.initial;
	}

    changeState(state) {
		for(var i=0;i<this.states.length;i++){
			if(state==this.states[i]){
				this.triggerOne=this.initial;
				this.initial=this.states[i];
				this.triggerFirst=null;
				return;
			}			
		}
		alert('ERROR');
	}

    trigger(event) {
		if(event=='study'&&this.initial=='normal'){
			this.triggerOne='normal';
			this.initial='busy';
			this.triggerFirst=null;
		}
		else if(event=='get_tired'&&this.initial=='busy'){
			this.triggerOne='busy';
			this.triggerTwo='normal';
			this.initial='sleeping';
			this.triggerFirst=null;
		}
		else if(event=='get_hungry'&&this.initial=='busy'){
			this.triggerOne='busy';
			this.triggerTwo='normal';
			this.initial='hungry';
			this.triggerFirst=null;
		}
		else if(event=='get_up'&&this.initial=='sleeping'){
			this.triggerOne='sleeping';
			this.triggerTwo='busy';
			this.initial='normal';
			this.triggerFirst=null;
		}
		else if(event=='eat'&&this.initial=='hungry'){
			this.triggerOne='hungry';
			this.triggerTwo='busy';
			this.initial='normal';
			this.triggerFirst=null;
		}
		else if(event=='get_hungry'&&this.initial=='sleeping'){
			this.triggerOne='sleeping';
			this.triggerTwo='busy';			
			this.initial='hungry';
			this.triggerFirst=null;
		}
		else{
			alert('ERROR');
		}	
	}

    reset() {
		this.initial='normal';
	}

    getStates(event) {
		if(!event){
			return ['normal', 'busy', 'hungry', 'sleeping'];
		}
		else if(event=='get_hungry'){
			return ['busy', 'sleeping'];
		}
		else if(event=='study'){
			return ['normal'];
		}
		else{
			return [];
		}		
	}

    undo() {
		if(this.triggerOne!=null){
			if(this.triggerFirst==null){
				this.triggerFirst=this.initial;
			}
			else{
				this.triggerSecond=this.triggerFirst;
				this.triggerFirst=this.initial;
			}
			
			this.initial=this.triggerOne;			
			if(this.triggerTwo!=null){
				this.triggerOne=this.triggerTwo;
				this.triggerTwo=null;
			}
			else{
				this.triggerOne=null;
			}
			return true;
		}
		else{
			return false;
		}
	}

    redo() {
		if(this.triggerFirst!=null){
			this.triggerOne=this.initial;
			this.initial=this.triggerFirst;

			if(this.triggerSecond!=null){
				this.triggerFirst=this.triggerSecond;
				this.triggerSecond=null;			
			}
			else{
				this.triggerFirst=null;
			}
			return true;
		}
		else{
			return false;
		}
	}

    clearHistory() {
		this.triggerOne=null;
		this.triggerFirst=null;
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
