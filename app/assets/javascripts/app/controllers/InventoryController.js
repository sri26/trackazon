function InventoryController($scope, inventory, ProductService) {
  var ctrl = this;
  ctrl.products = inventory.data;

  $scope.rowClass = function(product) {
    return product.inStock === 0 ? "table-active" : "";
  }

  ctrl.addNewProduct = function() {
    ProductService.postProduct($scope.product)
      .then(function(response) {
        ctrl.products.push(response.data);
        $scope.product = {};
        $scope.newProductForm.$setUntouched();
        $scope.newProductForm.$setPristine();
      },function(error) {
        console.log("Error occurred: " + error);
      });
  }

  ctrl.inStockItems = function() {
    var inStock = [];

    ProductService.getProducts().then(function(response) {
      response.data.forEach(function(product) {
        if (product.quantity !== product.quantity_sold) {
          inStock.push(product)
        }
        })
      }, function(error) {
        console.log("Error occurred: " + error);
      });

    ctrl.products = inStock;
  }

  ctrl.outOfStockItems = function() {
    var outOfStock = [];

    ProductService.getProducts().then(function(response) {
      response.data.forEach(function(product) {
        if (product.quantity === product.quantity_sold) {
          outOfStock.push(product);
        }
      })
    }, function(error) {
      console.log("Error occurred: " + error);
    })

    ctrl.products = outOfStock;
  }
}

angular
  .module('app')
  .controller('InventoryController', InventoryController)
