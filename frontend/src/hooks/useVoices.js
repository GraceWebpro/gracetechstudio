import { useEffect, useState, useCallback } from "react";


export default function useVoices() {

  const [voices, setVoices] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);



  /*
    Fetch voices
  */

  const fetchVoices = useCallback(async()=>{

    try {

      setLoading(true);
      setError(null);


      const response =
        await fetch(
          "/api/voices"
        );


      if(!response.ok){

        throw new Error(
          "Failed to load voices"
        );

      }


      const data =
        await response.json();


      setVoices(
        data.voices || []
      );


    } catch(err){

      console.error(err);

      setError(
        err.message
      );


    } finally {

      setLoading(false);

    }


  },[]);



  /*
    Create voice after cloning
  */

  const createVoice = async(payload)=>{

    try{

      setLoading(true);

      setError(null);


      const response =
        await fetch(
          "/api/voices/create",
          {
            method:"POST",

            headers:{
              "Content-Type":
              "application/json",
            },

            body:
            JSON.stringify(payload),
          }
        );



      if(!response.ok){

        throw new Error(
          "Voice creation failed"
        );

      }


      const data =
        await response.json();



      setVoices(prev=>[
        ...prev,
        data.voice
      ]);


      return data.voice;


    }
    catch(err){

      setError(
        err.message
      );

      throw err;

    }
    finally{

      setLoading(false);

    }

  };




  /*
    Upload voice samples
    Used before cloning
  */


  const uploadSamples = async(files)=>{


    const formData =
      new FormData();


    files.forEach(file=>{

      formData.append(
        "samples",
        file
      );

    });



    try{

      setLoading(true);


      const response =
        await fetch(
          "/api/voices/upload",
          {
            method:"POST",
            body:formData,
          }
        );


      if(!response.ok){

        throw new Error(
          "Upload failed"
        );

      }


      return await response.json();



    }catch(err){

      setError(
        err.message
      );

      throw err;

    }
    finally{

      setLoading(false);

    }

  };





  /*
    Delete voice
  */


  const deleteVoice = async(id)=>{


    try{

      setLoading(true);


      const response =
        await fetch(
          `/api/voices/${id}`,
          {
            method:"DELETE",
          }
        );



      if(!response.ok){

        throw new Error(
          "Delete failed"
        );

      }



      setVoices(prev =>
        prev.filter(
          voice =>
          voice.id !== id
        )
      );



    }
    catch(err){

      setError(
        err.message
      );

      throw err;

    }
    finally{

      setLoading(false);

    }

  };





  /*
    Update voice settings

    Example:
    name
    language
    stability
    style
  */


  const updateVoice = async(
    id,
    updates
  )=>{


    try{

      setLoading(true);



      const response =
        await fetch(
          `/api/voices/${id}`,
          {
            method:"PATCH",

            headers:{
              "Content-Type":
              "application/json",
            },

            body:
            JSON.stringify(updates),
          }
        );



      if(!response.ok){

        throw new Error(
          "Update failed"
        );

      }



      const data =
        await response.json();



      setVoices(prev=>

        prev.map(voice=>

          voice.id === id
          ?
          data.voice
          :
          voice

        )

      );



      return data.voice;



    }
    catch(err){

      setError(
        err.message
      );

      throw err;

    }
    finally{

      setLoading(false);

    }

  };





  /*
    Set default voice
  */


  const setDefaultVoice =
    async(id)=>{


      return updateVoice(
        id,
        {
          isDefault:true
        }
      );

    };





  useEffect(()=>{

    fetchVoices();

  },[
    fetchVoices
  ]);




  return {

    voices,

    loading,

    error,


    fetchVoices,

    createVoice,

    uploadSamples,

    deleteVoice,

    updateVoice,

    setDefaultVoice,

  };

}