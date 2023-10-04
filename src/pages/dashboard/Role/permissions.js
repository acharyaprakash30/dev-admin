const allPermission = [
    {
        "name": "User",
        "value": [
            'ViewOwnUser',
            'ViewAnyUser',
            'ViewTenantUser',
            'CreateAnyUser',
            'CreateTenantUser',
            'UpdateOwnUser',
            'UpdateTenantUser',
            'UpdateAnyUser',
            'DeleteTenantUser',
            'DeleteAnyUser',
            "CreateRoledUser",
        ],
    },
    {
        "name": "Audit",
        "value": [
            'ViewAudit',
            'CreateAudit',
            'UpdateAudit',
            'DeleteAudit',
        ],
    },
    {
        "name": "Role",
        "value": [
            'ViewRole',
            'CreateRole',
            'UpdateRole',
            'DeleteRole',
        ],
    },
    {
        "name": "Tenant",
        "value": [
            'ViewTenant',
            'DeleteTenant',
            'ViewOwnTenant',
            'CreateOwnTenant',
            'UpdateOwnTenant',
            'DeleteOwnTenant',
        ],
    },
    {
        "name": "Product",
        "value": [
            'ViewProduct',
            'CreateProduct',
            'UpdateProduct',
            'DeleteProduct',
        ],
    },
    {
        "name": "Brand",
        "value": [
            'ViewBrand',
            'CreateBrand',
            'UpdateBrand',
            'DeleteBrand',
        ],
    },
    {   "name": "Category",
        "value": [
            'ViewCategory',
            'CreateCategory',
            'UpdateCategory',
            'DeleteCategory',
        ],
    },
    {
        "name": "Category Form Group",
        "value": [
            'ViewCategoryFormGroup',
            'CreateCategoryFormGroup',
            'UpdateCategoryFormGroup',
            'DeleteCategoryFormGroup',
        ],
    },
    {
        "name": "Category Form",
        "value": [
            'ViewCategoryForm',
            'CreateCategoryForm',
            'UpdateCategoryForm',
            'DeleteCategoryForm',
        ],
    },
    {
        "name": "Vendor Document Form",
        "value": [
            'ViewVendorDocumentForm',
            'CreateVendorDocumentForm',
            'UpdateVendorDocumentForm',
            'DeleteVendorDocumentForm',
        ],
    },
    {
        "name": "Vendor Document Form Specification",
        "value": [
            'ViewVendorDocumentFormSpecification',
            'CreateVendorDocumentFormSpecification',
            'UpdateVendorDocumentFormSpecification',
            'DeleteVendorDocumentFormSpecification'
        ]

    }
];

export default allPermission;