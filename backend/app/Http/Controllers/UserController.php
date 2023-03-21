<?php

namespace App\Http\Controllers;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
// use Symfony\Component\HttpKernel\Profiler\Profile;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Validator;




class UserController extends Controller
{
    // ...
    public function user(Request $request)
    {
        $user = Auth::user()->name;
       return response()->json([
        "name"=>$user
       ]);
    }
 

    public function getUserInfo(Request $request, $id){
        $user = DB::select("select * from users where id= {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }
    

    public function getUserInfoByEmail(Request $request, $email){
        $user = DB::select("select * from users where email = '{$email}' ");
        $user = Auth::user();
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }
    
    function updateProfile(Request $request){
        //Validate input
        $validator = Validator::make($request->all(), [
            
            'bio' => 'string|max:100',
            'age' => 'integer',
            'gender' => 'string',
            'location' => 'string',
        ]);

        //If the validator failed, send back an error
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        //Get the user info depending on the id     
        $profile = User::find($request->user_id);    
        //If the user doesn't exist, display an error
        if($profile == null){
            return response()->json([
                'message' => 'No Such User',
            ], 400);
        }
        //Modify the info depending on the user's sent data
        $profile->user_id = $request->user_id != null ? $request->user_id : $profile->user_id;
        $profile->bio = $request->bio != null ? $request->bio : $profile->bio;
        $profile->age = $request->age != null ? $request->age : $profile->age;
       
        $profile->gender = $request->gender != null ? $request->gender : $profile->gender;
        $profile->location = $request->location != null ? $request->location : $profile->location;
       
        //If the new data wasn't saved, send back an error
        if(!$profile->save()){
            return response()->json([
                'message' => 'Unsuccessful Editing',
            ], 400);
        }     
        //Return a json response with the data
        return response()->json([
            'message' => 'Successfully Edited',
            'user' => $profile
        ], 201);
    }

    function getBlocked($id) {
        // Get all blocked users
        $blockedUsers = User::select("*")
            ->join("blocks", "users.id", "=", "blocks.blocked_id")
            ->where("blocks.blocker_id", "=", $id)
            ->get();
    
        // If no users are blocked, display an error
        if ($blockedUsers->isEmpty()) {
            return response()->json([
                'status' => "Error",
                'message' => "No blocked Users"
            ], 400);
        }
    
        // Send back a JSON response with the result
        return response()->json($blockedUsers, 200);
    }
    
    public function getFavorites(Request $request, $id) {
        $favorites = DB::select("SELECT DISTINCT * FROM favorites f JOIN users u ON u.id = f.favorite_id WHERE user_id = {$id}");
        return response()->json([
            "status" => "Success",
            "data" => $favorites
        ]);
    }

    public function filter(Request $request)
{
    $query = User::query();

    // Filter by age
    if ($request->has('age')) {
        $query->whereHas('profile', function ($query) use ($request) {
            $query->where('age', $request->age);
        });
    }

    // Filter by location
    if ($request->has('location')) {
        $query->whereHas('profile', function ($query) use ($request) {
            $query->where('location', $request->location);
        });
    }

    if ($request->has('name')) {
        $query->whereHas('profile', function ($query) use ($request) {
            $query->where('name', $request->location);
        });
    }

    // Return filtered users
    return $query->get();
}

    
public function upload(Request $request)
{
    $request->validate([
        'photo' => 'required|image|max:2048',
    ]);

    $photoName = time().'.'.$request->photo->extension();

    $request->photo->move(public_path('photos'), $photoName);

    $photo = new Photo();
    $photo->photo = $photoName;
    $photo->user_id = Auth::user()->id;
    $photo->save();

    return response()->json([
        'message' => 'Photo uploaded successfully!',
        'photo' => $photo
    ], 201);
}

public function index(Request $request)
    {
        // Get the current user's gender
        $currentUserGender = $request->user()->profile->gender;

        // Determine the opposite gender
        $oppositeGender = $currentUserGender === 'male' ? 'female' : 'male';

        // Get all users of the opposite gender
        $users = User::whereHas('profile', function ($query) use ($oppositeGender) {
            $query->where('gender', $oppositeGender);
        })->get();

        return response()->json($users);
    }
}
   
}



