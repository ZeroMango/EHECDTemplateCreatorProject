using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebUI.CodeGenerator
{
    public abstract class CodeGenerator
    {
        public string Path { get; set; }

        protected CodeGenerator next;

        protected List<string> result;

        public void SetResult(List<string> para)
        {
            this.result = para;
        }

        public List<string> GetResult()
        {
            return result;
        }

        public void Next(CodeGenerator next)
        {
            this.next = next;
        }

        public abstract void GenerateCode(object param);
    }
}