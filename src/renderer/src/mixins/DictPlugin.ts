import { queryBatch } from '@api/dict'

export default function( app ){ 

    app.mixin({
        data(){
            return {
                dicts:{}
            }
        },
        methods:{
            async sendDicts( params ){
                let res = await queryBatch( params );
                this.dicts = res.data;
            }
        }
    })

}
