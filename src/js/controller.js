angular.module('myApp', [])
    .controller('myController', function ($scope) {
        try {
            $scope.people = JSON.parse(localStorage.getItem('people')) || [];
        } catch (e) {
            console.error("Error parsing JSON from localStorage:", e);
            $scope.people = [];
        }

        //Fucntion to add the person 
        $scope.addPerson = function () {
            if ($scope.name && $scope.age && $scope.rollNo) {
                let newPerson = {
                    id: Date.now(), // Add a unique identifier
                    name: $scope.name,
                    age: parseInt($scope.age),
                    rollNo: parseInt($scope.rollNo)
                };

                $scope.people.push(newPerson);
                localStorage.setItem('people', JSON.stringify($scope.people));

                $scope.name = '';
                $scope.age = '';
                $scope.rollNo = '';
            } else {
                alert("Please fill in all fields.");
            }
        };

        //Funciton to delete the person 

        $scope.deletePerson = function (person) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    let index = $scope.people.indexOf(person);

                    $scope.people.splice(index, 1);

                    // Update the local Storage 
                    localStorage.setItem("people", JSON.stringify($scope.people))

                    $scope.$apply();
                    Swal.fire(
                        'Deleted!',
                        'The person has been deleted.',
                        'success'
                    );
                }
            })

        };

        $scope.viewDetails = function (person) {
            Swal.fire({
                title: 'Person Details',
                html: `<p>Name: ${person.name}</p>
                       <p>Age: ${person.age}</p>
                       <p>Roll Number: ${person.rollNo}</p>`,
                icon: 'info',
                confirmButtonText: 'Close'
            })
        }
    });