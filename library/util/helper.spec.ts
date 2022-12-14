import { UntypedFormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { expandTreeNodes, updateFormGroup, validates } from '@weplanx/ng';
import { NzTreeNode } from 'ng-zorro-antd/tree';

describe('测试助手', () => {
  it('updateFormGroup', () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule]
    });
    const fb = TestBed.inject(UntypedFormBuilder);
    const f = fb.group({
      name: [null, Validators.required],
      meta: fb.group({
        phone: []
      })
    });
    updateFormGroup(Object.values(f.controls));
    expect(f.get('name')?.status).toEqual('INVALID');
    expect(f.get('meta')?.get('phone')?.status).toEqual('VALID');
  });

  it('validates.password', () => {
    expect(validates.password('abcd')).toEqual({ min: true, error: true });
    expect(validates.password('ABCDEFGHIGKLMN')).toEqual({ lowercase: true, error: true });
    expect(validates.password('abcdefghigklmn')).toEqual({ uppercase: true, error: true });
    expect(validates.password('Abcdefghigklmn')).toEqual({ number: true, error: true });
    expect(validates.password('Abcdefghigklmn123')).toEqual({ symbol: true, error: true });
    expect(validates.password('Abcdefghigklmn+123')).toBeNull();
  });

  it('expandTreeNodes', () => {
    const nodes = [
      new NzTreeNode({
        title: 'Root',
        key: 'root',
        children: [
          new NzTreeNode({
            title: 'Group A',
            key: 'group-a'
          }),
          new NzTreeNode({
            title: 'Group B',
            key: 'group-b',
            children: [
              new NzTreeNode({
                title: 'Sub 1',
                key: 'group-b-1'
              })
            ]
          })
        ]
      })
    ];
    expandTreeNodes(nodes, true);
    const stack = [...nodes];
    const list = [];
    while (stack.length !== 0) {
      const node = stack.pop();
      list.push(node);
      if (node?.children.length !== 0) {
        stack.push(...node!.children);
      }
    }
    expect(list.every(v => v!.isExpanded)).toBeTruthy();
  });
});
