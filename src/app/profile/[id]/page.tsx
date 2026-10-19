export default function UserProfile({params}:any){
    return (
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2">
            <h1>
                profile
            </h1>
            <hr/>
            <p className="text-4xl">profile porn
               <span className="p-2 ml-2 rounded bg-orange-500 text-black"> {params.id}</span>
            </p>
            <h2>this is the id of ishan das</h2>
        </div>
    ) 
}